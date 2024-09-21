import Account from "./Account";

function SettingsPage() {
  return (
    <div className="settings-page">
      <div className="settings-side-bar-container">
        <div className="settings-side-bar">
          <div className="settings-group">Account</div>
          <div className="settings-group">Privacy</div>
          <div className="settings-group">Theme</div>
          <div className="settings-group">Accessibility</div>
          <div className="settings-group">Voice & Video</div>
          <div className="settings-group">Log Out</div>
        </div>
      </div>
      <div className="settings-page-content-container">
        <Account />
      </div>
      <div className="settings-exit">
        <span className="material-icons exit-icon">close</span>
      </div>
    </div>
  );
}

export default SettingsPage;
