/* eslint-disable jsx-a11y/img-redundant-alt */
import { Link } from "react-router-dom";
import { useContext, useEffect, useState, useRef } from "react";
import { AgoraContext } from "../AgoraContext";
import { socket } from "../socket.js";

function ProfileBar({ user, setInVoice }) {
  const {
    leaveVoiceChannel,
    isJoined,
    currentChannel,
    isMuted,
    toggleMute,
    isDeafened,
    toggleDeafen,
  } = useContext(AgoraContext);
  const [channelName, setChannelName] = useState("");
  const [call, setCall] = useState(false);
  const defaultPfp =
    "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg";

  function grabFriendId(id) {
    let grabbedId = id.substring(6);
    grabbedId = grabbedId.split(",");

    return grabbedId.filter((id) => id != user.id)[0];
  }

  function leaveVoiceChannelHandler() {
    leaveVoiceChannel();
    if (call) {
      socket.emit("get_current_users", currentChannel, (users) => {
        socket.emit("leave_voice_call");
        if (users.length < 2) {
          if (setInVoice) {
            setInVoice((prev) => {
              return { ...prev, [grabFriendId(currentChannel)]: false };
            });
          }
        }
      });

      return;
    }
    socket.emit("leave_voice_channel");
  }

  useEffect(() => {
    if (!user.id) return;
    if (isJoined) {
      if (currentChannel.substring(0, 6) === "friend") {
        setCall(true);
        let grabbedId = grabFriendId(currentChannel);
        fetch("/api/users/get/" + grabbedId, { method: "GET" })
          .then((res) => res.json())
          .then((data) => {
            setChannelName(data.name);
          });
      } else if (currentChannel.substring(0, 7) === "channel") {
        setCall(false);
        let grabbedId = currentChannel.substring(7);
        fetch("/api/servers/channel/" + grabbedId, {
          method: "GET",
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);

            setChannelName(data.channel.name);
          });
      }
    }

    return () => {
      socket.off("user_joined_voice");
    };
  }, [user, isJoined, currentChannel]);

  return (
    <div className="profile-bar">
      <div className="profile-top">
        <div className="profile-container">
          <div className="profile-pfp">
            <img
              src={user.pfp ? user.pfp : defaultPfp}
              alt="user profile"
              className="pfp-img"
            />
          </div>
          <span className="profile-name">{user.name}</span>
        </div>
        <div className="profile-icons">
          <Link to="/settings/account" className="material-icons">
            settings
          </Link>
        </div>
      </div>
      {isJoined && (
        <div className="profile-bottom">
          <div className="profile-bottom-left">
            <span id="connected-text">Connected</span>{" "}
            <span id="connected-channel">{channelName}</span>
          </div>
          <div className="profile-icons">
            <span
              className="material-icons"
              onClick={toggleMute}
              style={{ color: isMuted ? "#ff3838" : "inherit" }}
            >
              {isMuted ? "mic_off" : "mic"}
            </span>
            <span
              className="material-icons"
              onClick={() => {
                if (!isMuted) {
                  toggleMute();
                }
                toggleDeafen();
              }}
              style={{ color: isDeafened ? "#ff3838" : "inherit" }}
            >
              {isDeafened ? "headset_off" : "headphones"}
            </span>
            <span className="material-icons" onClick={leaveVoiceChannelHandler}>
              call_end
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileBar;
