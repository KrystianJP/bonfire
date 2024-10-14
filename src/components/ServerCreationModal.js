import { useState } from "react";

function ServerCreationModal({ toggleModal, token }) {
  const [uploadURLDisplay, setUploadURLDisplay] = useState(false);
  const [pfpURL, setPfpURL] = useState("");
  const [pfpPlaceholderText, setPfpPlaceholderText] = useState(
    "Paste image URL here...",
  );
  const [namePlaceholder, setNamePlaceholder] = useState("Enter Server Name");
  const [uploadedPfp, setUploadedPfp] = useState("");
  const [serverName, setServerName] = useState("");
  const defaultPfp =
    "https://cdn-icons-png.flaticon.com/512/16745/16745664.png";

  function uploadPfp(url) {
    var image = new Image();
    image.src = url;
    image.onload = () => {
      setUploadedPfp(url);
      setUploadURLDisplay(false);
    };
    image.onerror = () => {
      setPfpURL("");
      setUploadedPfp("");
      setPfpPlaceholderText("Invalid URL, Try again...");
    };
  }

  function createServer() {
    if (!serverName) {
      setNamePlaceholder("Please " + namePlaceholder);
      return;
    }
    fetch("/api/servers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: serverName,
        icon: uploadedPfp,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        toggleModal();
        window.location.href = `/servers/${data.serverid}/${data.default_channel}`;
      });
  }

  return (
    <div className="dark-bg" onClick={toggleModal}>
      <div
        className="channel-creation-modal server-creation-modal"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h2>Create New Server</h2>
        <div className="setting-label">SERVER NAME</div>
        <div className="server-name-input-container">
          <input
            type="text"
            name="channel-name"
            className="search-bar channel-name-input"
            onChange={(e) => setServerName(e.target.value)}
            value={serverName}
            placeholder={namePlaceholder}
          />{" "}
        </div>
        <div className="setting-container">
          <div className="setting-label">SERVER ICON</div>
          <div
            className="setting-pfp"
            onClick={() => setUploadURLDisplay(!uploadURLDisplay)}
          >
            <img
              alt="server"
              src={uploadedPfp ? uploadedPfp : defaultPfp}
              className={"pfp-img"}
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
        <div className="modal-buttons-container">
          <button className="cancel-button" onClick={toggleModal}>
            Cancel
          </button>
          <button className="create-button" onClick={createServer}>
            Create Server
          </button>
        </div>
      </div>
    </div>
  );
}

export default ServerCreationModal;
