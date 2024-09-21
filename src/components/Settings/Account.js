function Account() {
  return (
    <div className="account-page settings-content">
      <h1>Account</h1>
      <div className="setting-container">
        <div className="setting-label">USERNAME</div>
        <div className="username-container">
          <span className="username">HugeJuicyPickle</span>
          <span className="material-icons edit-icon">edit</span>
        </div>
      </div>
      <div className="setting-container">
        <div className="setting-label">PROFILE PICTURE</div>
        <div className="setting-pfp">
          <img
            src="https://i.pinimg.com/originals/d5/7c/eb/d57ceb9546385b8d5c224c34502ddcf6.jpg"
            className="pfp-img"
          />
        </div>
      </div>
      <div className="setting-container">
        <div className="setting-label">BANNER COLOUR</div>
        <input
          type="color"
          defaultValue="#a33535"
          className="setting-bg-color"
        ></input>
      </div>
      <div className="setting-container">
        <div className="setting-label">ABOUT ME</div>
        <textarea className="setting-about-me"></textarea>
      </div>
      <button className="about-me-save-button">Save</button>
      <button className="password-button">Change password</button>
      <button className="danger-button">Delete account</button>
    </div>
  );
}

export default Account;
