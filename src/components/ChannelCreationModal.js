import { useState } from "react";

function ChannelCreationModal({ toggleModal, group }) {
  const [type, setType] = useState("text");
  return (
    <div className="dark-bg" onClick={(e) => toggleModal(e, "")}>
      <div
        className="channel-creation-modal"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h2>Create Channel</h2>
        <div>in {group}</div>
        <div className="setting-container">
          <div className="setting-label">CHANNEL TYPE</div>
          <label
            className={
              "radio-container" + (type === "text" ? " highlight" : "")
            }
            onClick={() => {
              setType("text");
            }}
          >
            <span className="material-icons">tag</span>
            Text{" "}
            <label>
              <input
                type="radio"
                name="channel-type"
                value="text"
                className="radio"
                defaultChecked
              />
              <span className="radio-display">
                <span className="radio-dot"></span>
              </span>
            </label>
          </label>
          <label
            className={
              "radio-container" + (type === "voice" ? " highlight" : "")
            }
            onClick={() => {
              setType("voice");
            }}
          >
            <span className="material-icons">volume_up</span>
            Voice{" "}
            <label>
              <input
                type="radio"
                name="channel-type"
                value="voice"
                className="radio"
              />
              <span className="radio-display">
                <span className="radio-dot"></span>
              </span>
            </label>
          </label>
        </div>
        <div className="setting-container">
          <div className="setting-label">CHANNEL NAME</div>
          <div className="channel-name-input-container">
            <span className="material-icons">
              {type === "text" ? "tag" : "volume_up"}
            </span>
            <input
              type="text"
              name="channel-name"
              className="search-bar channel-name-input"
              placeholder="new-channel"
            />{" "}
          </div>
        </div>
        <div className="modal-buttons-container">
          <button className="cancel-button" onClick={toggleModal}>
            Cancel
          </button>
          <button className="create-button">Create Channel</button>
        </div>
      </div>
    </div>
  );
}

export default ChannelCreationModal;
