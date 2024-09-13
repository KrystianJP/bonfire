function DMProfileBar() {
  return (
    <div className="dm-profile-bar">
      <div className="dm-profile-top">
        <div className="dm-profile-pfp">
          <img
            src="https://i.pinimg.com/originals/d5/7c/eb/d57ceb9546385b8d5c224c34502ddcf6.jpg"
            alt="user profile picture"
            className="pfp-img"
          />
        </div>
      </div>
      <div className="dm-profile-details"></div>
    </div>
  );
}

export default DMProfileBar;
