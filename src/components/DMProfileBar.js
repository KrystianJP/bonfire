import { useParams } from "react-router-dom";

/* eslint-disable jsx-a11y/img-redundant-alt */
function DMProfileBar({ friend, displayStyle }) {
  const defaultPfp =
    "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg";

  return (
    <div
      className="dm-profile-bar"
      id="dm-profile-bar"
      style={{ display: displayStyle }}
    >
      <div
        className="dm-profile-top"
        style={{
          background: friend.banner ? "#" + friend.banner : "rgb(163, 53, 53)",
        }}
      >
        <div className="dm-profile-pfp">
          <img
            src={friend.pfp ? friend.pfp : defaultPfp}
            alt="user profile picture"
            className="pfp-img"
          />
        </div>
      </div>
      <div className="dm-profile-details">
        <span className="dm-profile-name">{friend.name}</span>
        <div className="about-me">
          <span className="about-me-header">About Me</span>
          <div className="about-me-content">{friend.about}</div>
        </div>
      </div>
    </div>
  );
}

export default DMProfileBar;
