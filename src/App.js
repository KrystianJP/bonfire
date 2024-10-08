import ServersBar from "./components/ServersBar";
import FriendsPage from "./components/FriendsPage";
import ServerPage from "./components/ServerPage";
import SettingsPage from "./components/Settings/SettingsPage";
import LoginPage from "./components/LoginPage";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from "react-router-dom";
import "./index.css";
import ServerSettingsPage from "./components/ServerSettings/ServerSettingsPage";
import ChannelCreationModal from "./components/ChannelCreationModal";
import { useState, useMemo, useEffect } from "react";

function App() {
  const [channelModalOpen, setChannelModalOpen] = useState(false);
  const [userProfileOpen, setUserProfileOpen] = useState(false);
  const [currentGroup, setCurrentGroup] = useState("");
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});

  function toggleChannelModal(e, group) {
    setChannelModalOpen(!channelModalOpen);
    setCurrentGroup(group);
    e.stopPropagation();
  }

  // getting user

  useEffect(() => {
    const storageToken = localStorage.getItem("token");
    if (storageToken) {
      setToken(storageToken);
    }
    if (storageToken) {
      fetch("/api/users/me", {
        method: "GET",
        headers: { Authorization: `Bearer ${storageToken}` },
      })
        .then((res) => res.json())
        .then((data) => {
          setUser({ username: data.name, pfp: data.pfp });
          if (
            window.location.pathname === "/login" ||
            window.location.pathname === "/register"
          ) {
            window.location.href = "/";
          }
        });
    } else {
      if (
        window.location.pathname !== "/login" &&
        window.location.pathname !== "/register"
      ) {
        window.location.href = "/login";
      }
    }
  }, [token]);

  const servers = [
    {
      id: 1,
      name: "Server for cool people",
      icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbhGz3EHmtHBkrjYLUhhTWcfZaJFT1h_4M2w&s",
    },
    {
      id: 2,
      name: "Server 2",
      icon: "https://www.mensjournal.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MjA3NzM1MTMxNzYxMjg5MTg5/shrek-5-announcement.jpg",
    },
  ];

  return (
    <Router>
      <div className="App" onClick={() => setUserProfileOpen(false)}>
        <Routes>
          {/* FRIENDS */}
          <Route
            exact
            path="/"
            element={
              <>
                <ServersBar servers={servers} />{" "}
                <FriendsPage user={user} page="friends-list" />
              </>
            }
          ></Route>
          <Route
            exact
            path="/messages/:username"
            element={
              <>
                <ServersBar servers={servers} />{" "}
                <FriendsPage user={user} page="dms" />
              </>
            }
          ></Route>

          {/* SETTINGS */}
          <Route
            exact
            path="/settings/account"
            element={<SettingsPage token={token} setting="account" />}
          ></Route>
          <Route
            exact
            path="/settings/privacy"
            element={<SettingsPage token={token} setting="privacy" />}
          ></Route>
          <Route
            exact
            path="/settings/appearance"
            element={<SettingsPage token={token} setting="appearance" />}
          ></Route>
          <Route
            exact
            path="/settings/voicevideo"
            element={<SettingsPage token={token} setting="voicevideo" />}
          ></Route>

          {/* SERVERS */}
          <Route
            exact
            path="/servers/:serverId/:channelId"
            element={
              <>
                <ServersBar servers={servers} />{" "}
                <ServerPage
                  user={user}
                  toggleChannelModal={toggleChannelModal}
                  userProfileState={[userProfileOpen, setUserProfileOpen]}
                />
              </>
            }
          ></Route>
          <Route
            exact
            path="/servers/:serverId/settings/overview"
            element={<ServerSettingsPage setting="overview" />}
          ></Route>
          <Route
            exact
            path="/servers/:serverId/settings/channels"
            element={<ServerSettingsPage setting="channels" />}
          ></Route>
          <Route
            exact
            path="/servers/:serverId/settings/roles"
            element={<ServerSettingsPage setting="roles" />}
          ></Route>
          <Route
            exact
            path="/servers/:serverId/settings/invites"
            element={<ServerSettingsPage setting="invites" />}
          ></Route>
          <Route
            exact
            path="/servers/:serverId/settings/bans"
            element={<ServerSettingsPage setting="bans" />}
          ></Route>

          <Route
            exact
            path="/login"
            element={<LoginPage login={true} />}
          ></Route>
          <Route
            exact
            path="/register"
            element={<LoginPage login={false} />}
          ></Route>
        </Routes>
        {channelModalOpen && (
          <ChannelCreationModal
            toggleModal={toggleChannelModal}
            group={currentGroup}
          />
        )}
      </div>
    </Router>
  );
}

export default App;
