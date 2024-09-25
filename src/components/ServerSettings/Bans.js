function Bans() {
  return (
    <div className="bans-page settings-content">
      <h1>Bans</h1>
      <div className="setting-container">
        <div className="setting-label">BANS</div>
        <div className="role-list">
          <div className="role-container">
            <div className="role">
              <div className="ban-pfp">
                <img
                  className="pfp-img"
                  src="https://i.pinimg.com/originals/d5/7c/eb/d57ceb9546385b8d5c224c34502ddcf6.jpg"
                />
              </div>
              Bad person
              <span className="material-icons unban-icon">close</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Bans;
