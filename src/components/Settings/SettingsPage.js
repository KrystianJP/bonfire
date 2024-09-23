import Account from "./Account";
import Privacy from "./Privacy";
import Appearance from "./Appearance";
import VoiceVideo from "./VoiceVideo";

function SettingsPage() {
  return (
    <div className="settings-page">
      <div className="settings-side-bar-container">
        <div className="settings-side-bar">
          <div className="settings-group">Account</div>
          <div className="settings-group">Privacy</div>
          <div className="settings-group">Appearance</div>
          <div className="settings-group">Voice & Video</div>
          <div className="settings-group log-out-group">
            Log Out
            <span className="material-icons exit-icon">exit_to_app</span>
          </div>
        </div>
      </div>
      <div className="settings-page-content-container">
        <VoiceVideo />
      </div>
      <div className="settings-exit">
        <span className="material-icons exit-icon">close</span>
      </div>
    </div>
  );
}

export default SettingsPage;
