/* eslint-disable jsx-a11y/img-redundant-alt */
function ProfileBar() {
  return (
    <div className="profile-bar">
      <div className="profile-container">
        <div className="profile-pfp">
          <img
            src="https://i.pinimg.com/originals/d5/7c/eb/d57ceb9546385b8d5c224c34502ddcf6.jpg"
            alt="user profile picture"
            className="pfp-img"
          />
        </div>
        <span className="profile-name">HugeJuicyPickle</span>
      </div>
      <div className="profile-icons">
        <span className="material-icons">mic</span>
        <span className="material-icons">headphones</span>
        <span className="material-icons">settings</span>
      </div>
    </div>
  );
}

export default ProfileBar;
