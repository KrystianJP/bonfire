import { useParams } from "react-router-dom";

/* eslint-disable jsx-a11y/img-redundant-alt */
function DMProfileBar({ friend, displayStyle }) {
  const { username } = useParams();
  return (
    <div className="dm-profile-bar" style={{ display: displayStyle }}>
      <div className="dm-profile-top">
        <div className="dm-profile-pfp">
          <img
            src={friend.pfp}
            alt="user profile picture"
            className="pfp-img"
          />
        </div>
      </div>
      <div className="dm-profile-details">
        <span className="dm-profile-name">{username}</span>
        <div className="about-me">
          <span className="about-me-header">About Me</span>
          <div className="about-me-content">{friend.about}</div>
        </div>
      </div>
    </div>
  );
}

export default DMProfileBar;
