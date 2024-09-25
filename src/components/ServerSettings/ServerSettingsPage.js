import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import Overview from "./Overview";
import Roles from "./Roles";
import Invites from "./Invites";
import Bans from "./Bans";

function ServerSettingsPage({ setting }) {
  return (
    <div className="settings-page">
      <div className="settings-side-bar-container">
        <div className="settings-side-bar">
          <h1>SERVER NAME</h1>
          <Link to="/servers/1/settings/overview" className="settings-group">
            Overview
          </Link>
          <Link to="/servers/1/settings/roles" className="settings-group">
            Roles
          </Link>
          <Link to="/servers/1/settings/invites" className="settings-group">
            Invites
          </Link>
          <Link to="/servers/1/settings/bans" className="settings-group">
            Bans
          </Link>
        </div>
      </div>
      <div className="settings-page-content-container">
        {setting === "overview" && <Overview />}
        {setting === "roles" && <Roles />}
        {setting === "invites" && <Invites />}
        {setting === "bans" && <Bans />}
      </div>
      <div className="settings-exit">
        <Link to="/servers/1/12" className="material-icons exit-icon">
          close
        </Link>
      </div>
      <button className="save-button">Save Changes</button>
    </div>
  );
}

export default ServerSettingsPage;
