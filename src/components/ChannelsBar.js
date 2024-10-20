import { Link, useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AgoraContext } from "../AgoraContext";
import { socket } from "../socket.js";

function ChannelsBar({ groups, channels, user, users }) {
  const { channelId, serverId } = useParams();

  const [voiceChannelUsers, setVoiceChannelUsers] = useState({});
  const [usersMap, setUsersMap] = useState({}); // {id: user}

  const { joinVoiceChannel } = useContext(AgoraContext);

  useEffect(() => {
    if (!users) return;
    let tempUsers = {};

    users.forEach((user) => {
      tempUsers[user.id] = user;
    });

    setUsersMap(tempUsers);
  }, [users]);

  useEffect(() => {
    if (!socket || !usersMap) return;

    socket.on("joined_voice_channel", (data) => {
      if (usersMap[data.userid]) {
        setVoiceChannelUsers((prev) => {
          // Create a new copy of the state to avoid mutating the previous state
          const temp = { ...prev };
          // Check if the channel already has an entry
          if (!temp[data.channelId]) {
            temp[data.channelId] = [];
          }
          // Add user only if they aren't already in the list
          if (!temp[data.channelId].includes(data.userid)) {
            temp[data.channelId] = [...temp[data.channelId], data.userid];
          }
          return temp; // Return the new state
        });
      }
    });

    socket.on("left_voice_channel", (data) => {
      if (usersMap[data.userid]) {
        setVoiceChannelUsers((prev) => {
          const temp = { ...prev };
          temp[data.channelId] = temp[data.channelId].filter(
            (id) => id !== data.userid,
          );
          return temp;
        });
      }
    });

    return () => {
      socket.off("joined_voice_channel");
      socket.off("left_voice_channel");
    };
  }, [socket, usersMap]);

  useEffect(() => {
    if (!channels) return;

    channels
      .filter((channel) => channel.voice)
      .forEach((channel) => {
        socket.emit("get_current_users", "channel" + channel.id, (users) => {
          setVoiceChannelUsers((prev) => ({
            ...prev,
            ["channel" + channel.id]: users,
          }));
        });
      });
  }, [channels]);

  function joinVoiceChannelHandler(channelId) {
    joinVoiceChannel("channel" + channelId, user.id);
    socket.emit("join_voice_channel", "channel" + channelId);
  }

  return (
    <div className="channels-bar friends-bar">
      {groups.map((group) => {
        return (
          <div className="channel-group" key={group.id}>
            <div className="channel-group-name-container">
              <h4 className="channel-group-name">{group.name.toUpperCase()}</h4>
            </div>
            {channels
              .filter((channel) => channel.channel_group === group.id)
              .map((channel) => {
                return (
                  <div key={channel.id}>
                    <Link
                      to={
                        !channel.voice
                          ? `/servers/${serverId}/${channel.id}`
                          : "#"
                      }
                      className={
                        "channel" +
                        (channelId == channel.id ? " highlight" : "")
                      }
                      onClick={() => {
                        if (channel.voice) {
                          joinVoiceChannelHandler(channel.id.toString());
                        }
                      }}
                    >
                      <span className="material-icons">
                        {channel.voice ? "volume_up" : "tag"}
                      </span>
                      <span className="channel-name">{channel.name}</span>
                    </Link>
                    <div className="voice-channel-users">
                      {channel.voice &&
                        voiceChannelUsers["channel" + channel.id] &&
                        voiceChannelUsers["channel" + channel.id].map(
                          (userid) => {
                            return (
                              <div className="voice-channel-user" key={userid}>
                                <div className="ban-pfp">
                                  <img
                                    src={usersMap[userid].pfp}
                                    alt={usersMap[userid].name}
                                    className="pfp-img"
                                    key={userid}
                                  />
                                </div>
                                {usersMap[userid].name}
                              </div>
                            );
                          },
                        )}
                    </div>
                  </div>
                );
              })}
          </div>
        );
      })}
    </div>
  );
}

export default ChannelsBar;
