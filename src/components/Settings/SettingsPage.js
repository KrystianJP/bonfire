import Account from "./Account";
import Privacy from "./Privacy";
import Appearance from "./Appearance";
import VoiceVideo from "./VoiceVideo";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import { useMemo } from "react";

function SettingsPage({ setting }) {
  const settings = useMemo(() => {
    return {
      account: {
        username: "KrysJP",
        pfp: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbhGz3EHmtHBkrjYLUhhTWcfZaJFT1h_4M2w&s",
        banner: "#a33535",
        about: "me like krys",
      },
      privacy: {
        messages: [false, true, true],
        friendRequests: [false, false, false],
      },
      appearance: { theme: "dark", roleColours: true },
      voicevideo: {},
    };
  });
  return (
    <div className="settings-page">
      <div className="settings-side-bar-container">
        <div className="settings-side-bar">
          <Link to="/settings/account" className="settings-group">
            Account
          </Link>
          <Link to="/settings/privacy" className="settings-group">
            Privacy
          </Link>
          <Link to="/settings/appearance" className="settings-group">
            Appearance
          </Link>
          <Link to="/settings/voicevideo" className="settings-group">
            Voice & Video
          </Link>
          <Link to="/logout" className="settings-group log-out-group">
            Log Out
            <span className="material-icons exit-icon">exit_to_app</span>
          </Link>
        </div>
      </div>
      <div className="settings-page-content-container">
        {setting === "account" && <Account info={settings.account} />}
        {setting === "privacy" && <Privacy info={settings.privacy} />}
        {setting === "appearance" && <Appearance />}
        {setting === "voicevideo" && <VoiceVideo />}
      </div>
      <div className="settings-exit">
        <Link to="/" className="material-icons exit-icon">
          close
        </Link>
      </div>
      <button className="save-button">Save Changes</button>
    </div>
  );
}

export default SettingsPage;
