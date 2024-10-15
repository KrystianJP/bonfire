import ServersBar from "./components/ServersBar";
import FriendsPage from "./components/FriendsPage";
import ServerPage from "./components/ServerPage";
import SettingsPage from "./components/Settings/SettingsPage";
import LoginPage from "./components/LoginPage";
import ServerCreationModal from "./components/ServerCreationModal";

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
import { io } from "socket.io-client";
import { socket } from "./socket.js";

function App() {
  const [channelModalOpen, setChannelModalOpen] = useState(false);
  const [serverModalOpen, setServerModalOpen] = useState(false);
  const [userProfileOpen, setUserProfileOpen] = useState(false);
  const [currentGroup, setCurrentGroup] = useState("");
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});

  function toggleChannelModal(e, group) {
    setChannelModalOpen(!channelModalOpen);
    setCurrentGroup(group);
    e.stopPropagation();
  }

  function toggleServerModal(e) {
    setServerModalOpen(!serverModalOpen);
    if (e) {
      e.stopPropagation();
    }
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
          setUser(data);
          socket.emit("new_user", data.id);

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
                <ServersBar toggleModal={toggleServerModal} token={token} />{" "}
                <FriendsPage token={token} user={user} page="friends-list" />
              </>
            }
          ></Route>
          <Route
            exact
            path="/messages/:friendId"
            element={
              <>
                <ServersBar toggleModal={toggleServerModal} token={token} />{" "}
                <FriendsPage token={token} user={user} page="dms" />
              </>
            }
          ></Route>

          {/* SETTINGS */}
          <Route
            exact
            path="/settings/account"
            element={
              <SettingsPage token={token} user={user} setting="account" />
            }
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
                <ServersBar token={token} toggleModal={toggleServerModal} />{" "}
                <ServerPage
                  user={user}
                  toggleChannelModal={toggleChannelModal}
                  userProfileState={[userProfileOpen, setUserProfileOpen]}
                  token={token}
                />
              </>
            }
          ></Route>
          <Route
            exact
            path="/servers/:serverId/settings/overview"
            element={<ServerSettingsPage token={token} setting="overview" />}
          ></Route>
          <Route
            exact
            path="/servers/:serverId/settings/channels"
            element={<ServerSettingsPage token={token} setting="channels" />}
          ></Route>
          <Route
            exact
            path="/servers/:serverId/settings/roles"
            element={<ServerSettingsPage token={token} setting="roles" />}
          ></Route>
          <Route
            exact
            path="/servers/:serverId/settings/invites"
            element={<ServerSettingsPage token={token} setting="invites" />}
          ></Route>
          <Route
            exact
            path="/servers/:serverId/settings/bans"
            element={<ServerSettingsPage token={token} setting="bans" />}
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
            token={token}
          />
        )}
        {serverModalOpen && (
          <ServerCreationModal token={token} toggleModal={toggleServerModal} />
        )}
      </div>
    </Router>
  );
}

export default App;
