import Account from "./Account";
import Privacy from "./Privacy";
import Appearance from "./Appearance";
import VoiceVideo from "./VoiceVideo";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

function SettingsPage({ setting, token, user }) {
  const [account, setAccount] = useState({});
  const [privacy, setPrivacy] = useState({
    messages: [false, false, false],
    friendRequests: [false, false, false],
  });
  const [appearance, setAppearance] = useState({
    theme: "dark",
    roleColours: true,
  });
  const [busy, setBusy] = useState(true);

  useEffect(() => {
    if (token) {
      fetch("/api/users/settings", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          setAccount({
            username: data.name,
            pfp: data.pfp,
            banner: data.banner,
            about: data.about,
          });
          setPrivacy({
            messages: data.message_privacy,
            friendRequests: data.friend_privacy,
          });
          setAppearance({ theme: data.theme, roleColours: data.role_colours });
          setBusy(false);
        });
    }
  }, [token]);

  function logout() {
    localStorage.removeItem("token");
    fetch("/api/users/logout", { method: "DELETE" });
  }

  // const settings = useMemo(() => {
  //   return {
  //     account: {
  //       username: "KrysJP",
  //       pfp: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbhGz3EHmtHBkrjYLUhhTWcfZaJFT1h_4M2w&s",
  //       banner: "#a33535",
  //       about: "me like krys",
  //     },
  //     privacy: {
  //       messages: [false, true, true],
  //       friendRequests: [false, false, false],
  //     },
  //     appearance: { theme: "dark", roleColours: true },
  //     voicevideo: {},
  //   };
  // });
  return (
    <div className="settings-page">
      <div className="settings-side-bar-container">
        <div className="settings-side-bar">
          <Link
            to="/settings/account"
            className={
              "settings-group" + (setting === "account" ? " highlight" : "")
            }
          >
            Account
          </Link>
          <Link
            to="/settings/privacy"
            className={
              "settings-group" + (setting === "privacy" ? " highlight" : "")
            }
          >
            Privacy
          </Link>
          <Link
            to="/settings/appearance"
            className={
              "settings-group" + (setting === "appearance" ? " highlight" : "")
            }
          >
            Appearance
          </Link>
          <Link
            to="/settings/voicevideo"
            className={
              "settings-group" + (setting === "voicevideo" ? " highlight" : "")
            }
          >
            Voice & Video
          </Link>
          <Link
            to="/login"
            onClick={logout}
            className="settings-group log-out-group"
          >
            Log Out
            <span className="material-icons exit-icon">exit_to_app</span>
          </Link>
        </div>
      </div>
      <div className="settings-page-content-container">
        {!busy && setting === "account" && <Account info={account} />}
        {!busy && setting === "privacy" && <Privacy info={privacy} />}
        {!busy && setting === "appearance" && <Appearance info={appearance} />}
        {!busy && setting === "voicevideo" && <VoiceVideo />}
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
