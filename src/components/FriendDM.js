/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from "react";
import { Link } from "react-router-dom";
function FriendDM() {
  const username = "SomeUsername";

  return (
    <Link to={`/messages/${username}`} className="friend-dm">
      <div className="friend-pfp">
        <img
          src="https://i.pinimg.com/originals/d5/7c/eb/d57ceb9546385b8d5c224c34502ddcf6.jpg"
          alt="user profile picture"
          className="pfp-img"
        />
      </div>
      <span className="friend-name">Pickle Juice Tartar Sauce</span>
    </Link>
  );
}

export default FriendDM;
