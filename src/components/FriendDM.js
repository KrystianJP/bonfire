/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function FriendDM({ friend, currentFriend }) {
  const [highlight, setHighlight] = useState("");

  useEffect(() => {
    if (friend.id === currentFriend.id) {
      setHighlight("highlight");
    } else {
      setHighlight("");
    }
  }, [currentFriend, friend.id]);

  return (
    <Link to={`/messages/${friend.id}`} className={"friend-dm " + highlight}>
      <div className="friend-pfp">
        <img src={friend.pfp} alt="user profile picture" className="pfp-img" />
      </div>
      <span className="friend-name">{friend.name}</span>
    </Link>
  );
}

export default FriendDM;
