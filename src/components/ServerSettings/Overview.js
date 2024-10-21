import { useState } from "react";

function Overview({ info, setOverview, setState, channels }) {
  const [uploadURLDisplay, setUploadURLDisplay] = useState(false);
  const [pfpURL, setPfpURL] = useState("");
  const [pfpPlaceholderText, setPfpPlaceholderText] = useState(
    "Paste image URL here...",
  );
  const [changingName, setChangingName] = useState(false);
  const [nameValue, setNameValue] = useState(info.name);
  // const [defaultChannel, setDefaultChannel] = useState(info.default_channel);

  const defaultIcon =
    "https://cdn-icons-png.flaticon.com/512/16745/16745664.png";

  // *** delete server

  function uploadPfp(url) {
    var image = new Image();
    image.src = url;
    image.onload = () => {
      setState(setOverview, { ...info, icon: url });
      setUploadURLDisplay(false);
    };
    image.onerror = () => {
      setPfpURL("");
      setPfpPlaceholderText("Invalid URL, Try again...");
    };
  }

  function confirmUsername(name) {
    fetch("/api/servers/find/" + name, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data[0] && data[0].name !== info.ogName) {
          alert("Name already taken, choose another one");
        } else {
          setState(setOverview, { ...info, name: name });
          setChangingName(false);
        }
      });
  }

  return (
    <div className="overview-page settings-content">
      <h1>Overview</h1>
      <div className="setting-container">
        <div className="setting-label">SERVER NAME</div>
        {!changingName ? (
          <div className="username-container">
            <span className="username">{info.name}</span>
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
                setNameValue(info.name);
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
        <div className="setting-label">SERVER ICON</div>
        <div
          className="setting-pfp"
          onClick={() => setUploadURLDisplay(!uploadURLDisplay)}
        >
          <img
            alt="server"
            src={info.icon ? info.icon : defaultIcon}
            className="pfp-img"
          />
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
        <div className="setting-label">DEFAULT CHANNEL</div>
        <select
          id="input-device-select"
          className="setting-text-size"
          defaultValue={info.default_channel}
          onChange={(e) => {
            setState(setOverview, { ...info, defaultChannel: e.target.value });
            console.log(info);
          }}
        >
          {channels.map((channel) => (
            <option key={channel.id} value={channel.id}>
              {channel.name}
            </option>
          ))}
        </select>
      </div>

      <button className="danger-button">Delete server</button>
    </div>
  );
}

export default Overview;
