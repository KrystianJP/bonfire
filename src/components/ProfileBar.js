/* eslint-disable jsx-a11y/img-redundant-alt */
import { Link } from "react-router-dom";
function ProfileBar({ user }) {
  return (
    <div className="profile-bar">
      <div className="profile-container">
        <div className="profile-pfp">
          <img
            src={
              user.pfp
                ? user.pfp
                : "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
            }
            alt="user profile picture"
            className="pfp-img"
          />
        </div>
        <span className="profile-name">{user.username}</span>
      </div>
      <div className="profile-icons">
        <span className="material-icons">mic</span>
        <span className="material-icons">headphones</span>
        <Link to="/settings/account" className="material-icons">
          settings
        </Link>
      </div>
    </div>
  );
}

export default ProfileBar;
