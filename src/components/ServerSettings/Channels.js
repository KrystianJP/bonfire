function Channels() {
  return (
    <div className="channels-page settings-content">
      <h1>Channels</h1>
      <div className="setting-container">
        <div className="setting-label">ROLES</div>
        <div className="role-list">
          <div className="role-container">
            <div className="role">
              <div className="friend-left">
                <span className="material-icons">tag</span>
                <span className="friend-name">Channel 1</span>
              </div>
              <span className="friend-icons">
                <span className="material-icons ">edit</span>
                <span className="material-icons ">delete</span>
              </span>
            </div>
          </div>
          <div className="role-container">
            <div className="role">
              <div className="friend-left">
                <span className="material-icons">volume_up</span>
                <span className="friend-name">Channel 2</span>
              </div>
              <span className="friend-icons">
                <span className="material-icons ">edit</span>
                <span className="material-icons ">delete</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Channels;
