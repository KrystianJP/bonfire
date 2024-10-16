/* eslint-disable jsx-a11y/img-redundant-alt */
import { Link, useParams } from "react-router-dom";
import DMProfileBar from "./DMProfileBar";
import Messages from "./Messages";
import { useEffect, useState } from "react";
function DMs({ friendInfo, token, user }) {
  var { friendId } = useParams();
  const [profileBarOpen, setProfileBarOpen] = useState(false);
  const [messages, setMessages] = useState([]);

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
    if (!token) return;
    if (friendId != friendInfo.id) return;
    fetch("/api/friends/messages/" + friendId, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setMessages(data);
        friendInfo.unread = false;
      })
      .catch((err) => console.log(err));
  }, [token, friendInfo, friendId]);

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
          <span className="material-icons">call</span>
          <span className="material-icons">videocam</span>
          <span className="material-icons">notifications</span>
          <span className="material-icons ">delete</span>
          <span className="material-icons ">block</span>
        </div>
      </div>

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
