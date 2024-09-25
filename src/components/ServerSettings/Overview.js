function Overview() {
  return (
    <div className="overview-page settings-content">
      <h1>Overview</h1>
      <div className="setting-container">
        <div className="setting-label">SERVER NAME</div>
        <div className="username-container">
          <span className="username">Some sort of server name</span>
          <span className="material-icons edit-icon">edit</span>
        </div>
      </div>
      <div className="setting-container">
        <div className="setting-label">SERVER ICON</div>
        <div className="setting-pfp">
          <img
            src="https://i.pinimg.com/originals/d5/7c/eb/d57ceb9546385b8d5c224c34502ddcf6.jpg"
            className="pfp-img"
          />
        </div>
      </div>
      <div className="setting-container">
        <div className="setting-label">DEFAULT CHANNEL</div>
        <select
          id="input-device-select"
          className="setting-text-size"
          defaultValue={"16px"}
        >
          <option value="14px">announcements</option>
          <option value="16px">general</option>
          <option value="18px">this</option>
          <option value="20px">that</option>
        </select>
      </div>

      <button className="danger-button">Delete server</button>
    </div>
  );
}

export default Overview;
