/* eslint-disable jsx-a11y/img-redundant-alt */
import { Link, useParams } from "react-router-dom";
import DMProfileBar from "./DMProfileBar";
import Messages from "./Messages";
import { useEffect, useState, useContext } from "react";
import { AgoraContext } from "../AgoraContext";
import { socket } from "../socket.js";
import UsersInCall from "./UsersInCall.js";

function DMs({
  friendInfo,
  token,
  user,
  unread,
  setUnread,
  setInVoice,
  inVoice,
}) {
  var { friendId } = useParams();
  const [profileBarOpen, setProfileBarOpen] = useState(false);
  const [messages, setMessages] = useState([]);

  const { joinVoiceChannel } = useContext(AgoraContext);

  function widthListener() {
    if (window.innerWidth > 1000) {
      setProfileBarOpen(true);
    } else {
      setProfileBarOpen(false);
    }
  }

  useEffect(() => {
    if (window.innerWidth > 1000) {
      setProfileBarOpen(true);
    }

    window.addEventListener("resize", widthListener);

    return () => {
      window.removeEventListener("resize", widthListener);
    };
  }, []);

  useEffect(() => {
    setMessages([]);
    if (!token || !friendInfo || !friendId) return;
    if (friendId != friendInfo.id) return;
    fetch("/api/friends/messages/" + friendId, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setMessages(data);
        let tempUnread = { ...unread };
        tempUnread[friendId] = false;
        setUnread(tempUnread);
      })
      .catch((err) => console.log(err));
  }, [token, friendInfo, friendId]);

  function joinVoiceChannelHandler() {
    setInVoice((prev) => {
      return { ...prev, [friendInfo.id]: true };
    });
    joinVoiceChannel(
      "friend" +
        Math.min(friendInfo.id, user.id) +
        "," +
        Math.max(friendInfo.id, user.id),
      user.id,
    );
    socket.emit("join_voice_call", {
      channelId:
        "friend" +
        Math.min(friendInfo.id, user.id) +
        "," +
        Math.max(friendInfo.id, user.id),
      friendId: friendInfo.id,
    });
  }

  useEffect(() => {
    socket.on("receive_message", (data) => {
      const newMessage = data.message.message;
      setMessages((prev) => [newMessage, ...prev]);
    });

    socket.on("deleted_dm_message", (messageId) => {
      setMessages((prev) => prev.filter((message) => message.id != messageId));
    });

    return () => {
      socket.off("receive_message");
      socket.off("deleted_dm_message");
    };
  }, []);

  return (
    <div className="dms">
      <div className="top-bar top-dm-bar">
        <div
          className="top-bar-left"
          onClick={() => setProfileBarOpen(!profileBarOpen)}
        >
          <div className="profile-pfp friend-dm-pfp">
            <img
              src={friendInfo.pfp}
              alt="friend profile picture"
              className="pfp-img"
            />
          </div>
          <span className="friend-name friend-name-dm">{friendInfo.name}</span>
        </div>
        <div className="top-bar-right">
          <span className="material-icons" onClick={joinVoiceChannelHandler}>
            call
          </span>
          <span className="material-icons">videocam</span>
          <span className="material-icons">notifications</span>
          <span className="material-icons ">delete</span>
          {/* <span className="material-icons ">block</span> */}
        </div>
      </div>

      {inVoice && (
        <UsersInCall user={user} friend={friendInfo} friendId={friendId} />
      )}

      <Messages
        user={user}
        token={token}
        users={[friendInfo, user]}
        messages={messages}
        placeholder={friendInfo.name}
        setMessages={setMessages}
      />

      <DMProfileBar
        friend={friendInfo}
        displayStyle={profileBarOpen ? "block" : "none"}
      />
    </div>
  );
}

export default DMs;
