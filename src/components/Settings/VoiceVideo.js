function VoiceVideo() {
  return (
    <div className="settings-content voice-video-page">
      <h1>Voice & Video</h1>
      <div className="setting-container">
        <div className="setting-label">INPUT DEVICE</div>
        <select
          id="input-device-select"
          className="setting-text-size"
          defaultValue={"16px"}
        >
          <option value="14px">Small</option>
          <option value="16px">Default</option>
          <option value="18px">Large</option>
          <option value="20px">X-Large</option>
        </select>
      </div>
      <div className="setting-container">
        <div className="setting-label">OUTPUT DEVICE</div>
        <select
          id="output-device-select"
          className="setting-text-size"
          defaultValue={"16px"}
        >
          <option value="14px">Small</option>
          <option value="16px">Default</option>
          <option value="18px">Large</option>
          <option value="20px">X-Large</option>
        </select>
      </div>

      <button className="test-mic-button">Test Microphone</button>
      <div className="setting-container">
        <div className="setting-label">VIDEO DEVICE</div>
        <select
          id="video-device-select"
          className="setting-text-size"
          defaultValue={"16px"}
        >
          <option value="14px">Small</option>
          <option value="16px">Default</option>
          <option value="18px">Large</option>
          <option value="20px">X-Large</option>
        </select>
      </div>
      <button className="test-video-button">Test Video Device</button>
    </div>
  );
}

export default VoiceVideo;
