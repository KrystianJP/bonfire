/* eslint-disable jsx-a11y/alt-text */
function Account({ info }) {
  const defaultPfp =
    "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg";

  return (
    <div className="account-page settings-content">
      <h1>Account</h1>
      <div className="setting-container">
        <div className="setting-label">USERNAME</div>
        <div className="username-container">
          <span className="username">{info.username}</span>
          <span className="material-icons edit-icon">edit</span>
        </div>
      </div>
      <div className="setting-container">
        <div className="setting-label">PROFILE PICTURE</div>
        <div className="setting-pfp">
          <img src={info.pfp ? info.pfp : defaultPfp} className="pfp-img" />
        </div>
      </div>
      <div className="setting-container">
        <div className="setting-label">BANNER COLOUR</div>
        <input
          type="color"
          defaultValue={"#" + info.banner}
          className="setting-bg-color"
        ></input>
      </div>
      <div className="setting-container">
        <div className="setting-label">ABOUT ME</div>
        <textarea
          className="setting-about-me"
          defaultValue={info.about}
        ></textarea>
      </div>
      <button className="password-button">Change password</button>
      <button className="danger-button">Delete account</button>
    </div>
  );
}

export default Account;
