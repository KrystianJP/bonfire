/* eslint-disable jsx-a11y/img-redundant-alt */
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AgoraContext } from "../AgoraContext";
import { socket } from "../socket.js";

function ProfileBar({ user }) {
  const { leaveVoiceChannel, isJoined } = useContext(AgoraContext);
  const defaultPfp =
    "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg";

  function leaveVoiceChannelHandler() {
    leaveVoiceChannel();
    socket.emit("leave_voice_channel");
  }

  return (
    <div className="profile-bar">
      <div className="profile-top">
        <div className="profile-container">
          <div className="profile-pfp">
            <img
              src={user.pfp ? user.pfp : defaultPfp}
              alt="user profile picture"
              className="pfp-img"
            />
          </div>
          <span className="profile-name">{user.name}</span>
        </div>
        <div className="profile-icons">
          <span className="material-icons">mic</span>
          <span className="material-icons">headphones</span>
          <Link to="/settings/account" className="material-icons">
            settings
          </Link>
        </div>
      </div>
      {isJoined && (
        <div className="profile-bottom">
          <div className="profile-bottom-left">
            <span id="connected-text">Connected</span>{" "}
            <span id="connected-channel">voice</span>
          </div>
          <span className="material-icons" onClick={leaveVoiceChannelHandler}>
            call_end
          </span>
        </div>
      )}
    </div>
  );
}

export default ProfileBar;
