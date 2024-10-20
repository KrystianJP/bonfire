/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
function FriendDM({ friend, unread, inVoice }) {
  const { friendId } = useParams();
  const [highlight, setHighlight] = useState("");
  // console.log(friend);

  useEffect(() => {
    if (friendId && friend.id == friendId) {
      setHighlight("highlight");
    } else {
      setHighlight("");
    }
  }, [friendId, friend.id]);

  return (
    <Link to={`/messages/${friend.id}`} className={"friend-dm " + highlight}>
      <div className="friend-pfp">
        <img
          src={friend.pfp}
          alt="user profile picture"
          style={{
            filter: friend.online ? "brightness(100%)" : "brightness(70%)",
          }}
          className="pfp-img"
        />
      </div>
      <span
        className="friend-name"
        style={{
          filter: friend.online ? "brightness(100%)" : "brightness(70%)",
        }}
      >
        {friend.name}
      </span>
      {inVoice ? (
        <span className="material-icons in-voice">volume_up</span>
      ) : null}
      {unread && friendId != friend.id ? (
        <div className="unread-dot"></div>
      ) : null}
    </Link>
  );
}

export default FriendDM;
