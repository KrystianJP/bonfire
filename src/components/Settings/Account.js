import { useMemo, useState } from "react";

/* eslint-disable jsx-a11y/alt-text */
function Account({ info, setAccount, setState, user }) {
  const defaultPfp =
    "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg";

  const [uploadURLDisplay, setUploadURLDisplay] = useState(false);
  const [pfpURL, setPfpURL] = useState("");
  const [pfpPlaceholderText, setPfpPlaceholderText] = useState(
    "Paste image URL here...",
  );
  const [changingName, setChangingName] = useState(false);
  const [nameValue, setNameValue] = useState(info.username);

  function uploadPfp(url) {
    var image = new Image();
    image.src = url;
    image.onload = () => {
      setState(setAccount, { ...info, pfp: url });
      setUploadURLDisplay(false);
    };
    image.onerror = () => {
      setPfpURL("");
      setPfpPlaceholderText("Invalid URL, Try again...");
    };
  }

  function confirmUsername(username) {
    fetch("/api/users/" + username, { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        if (data[0] && data[0].name !== user.name) {
          alert("Username already taken, choose another one");
        } else {
          setState(setAccount, { ...info, username: username });
          setChangingName(false);
        }
      });
  }

  return (
    <div className="account-page settings-content">
      <h1>Account</h1>
      <div className="setting-container">
        <div className="setting-label">USERNAME</div>
        {!changingName ? (
          <div className="username-container">
            <span className="username">{info.username}</span>
            <span
              className="material-icons edit-icon"
              onClick={() => setChangingName(true)}
            >
              edit
            </span>
          </div>
        ) : (
          <div className="username-container">
            <input
              type="text"
              className="search-bar"
              value={nameValue}
              onChange={(e) => setNameValue(e.target.value)}
            />
            <span
              className="material-icons edit-icon"
              onClick={() => {
                setChangingName(false);
                setNameValue(info.username);
              }}
            >
              close
            </span>
            <button
              className="button upload-button"
              onClick={() => {
                confirmUsername(nameValue);
              }}
            >
              Confirm
            </button>
          </div>
        )}
      </div>
      <div className="setting-container">
        <div className="setting-label">PROFILE PICTURE</div>
        <div
          className="setting-pfp"
          onClick={() => setUploadURLDisplay(!uploadURLDisplay)}
        >
          <img src={info.pfp ? info.pfp : defaultPfp} className="pfp-img" />
        </div>
        {uploadURLDisplay ? (
          <div className="image-upload-container">
            <input
              type="text"
              name="pfp"
              id="pfp"
              className="search-bar"
              placeholder={pfpPlaceholderText}
              onChange={(e) => setPfpURL(e.target.value)}
              value={pfpURL}
              required
            />
            <button
              className="button upload-button"
              onClick={() => uploadPfp(pfpURL)}
            >
              Upload
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="setting-container">
        <div className="setting-label">BANNER COLOUR</div>
        <input
          type="color"
          defaultValue={info.banner ? "#" + info.banner : "#a33535"}
          onChange={(e) =>
            setState(setAccount, { ...info, banner: e.target.value.slice(1) })
          }
          className="setting-bg-color"
        ></input>
      </div>
      <div className="setting-container">
        <div className="setting-label">ABOUT ME</div>
        <textarea
          className="setting-about-me"
          defaultValue={info.about}
          onChange={(e) =>
            setState(setAccount, { ...info, about: e.target.value })
          }
        ></textarea>
      </div>
      <button className="password-button">Change password</button>
      <button className="danger-button">Delete account</button>
    </div>
  );
}

export default Account;
