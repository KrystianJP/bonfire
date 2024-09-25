import { Link } from "react-router-dom";
import DMProfileBar from "./DMProfileBar";
import Messages from "./Messages";
import { useState } from "react";
function DMs() {
  return (
    <div className="dms">
      <div className="top-bar top-dm-bar">
        <div className="top-bar-left">
          <div className="profile-pfp friend-dm-pfp">
            <img
              src="https://i.pinimg.com/originals/d5/7c/eb/d57ceb9546385b8d5c224c34502ddcf6.jpg"
              alt="friend profile picture"
              className="pfp-img"
            />
          </div>
          <span className="friend-name friend-name-dm">KrysJP</span>
        </div>
        <div className="top-bar-right">
          <span className="material-icons">call</span>
          <span className="material-icons">videocam</span>
          <span className="material-icons">notifications</span>
          <span className="material-icons dangerous-icon">delete</span>
          <span className="material-icons dangerous-icon">block</span>
        </div>
      </div>
      <Messages />
      <DMProfileBar />
    </div>
  );
}

export default DMs;
