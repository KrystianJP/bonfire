import ServersBar from "./components/ServersBar";
import FriendsPage from "./components/FriendsPage";
import ServerPage from "./components/ServerPage";
import SettingsPage from "./components/Settings/SettingsPage";
import LoginPage from "./components/LoginPage";
import ServerCreationModal from "./components/ServerCreationModal";
import InviteBuffer from "./components/InviteBuffer.js";
import ServerSettingsPage from "./components/ServerSettings/ServerSettingsPage";
import ChannelCreationModal from "./components/ChannelCreationModal";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from "react-router-dom";
import "./index.css";
import { useState, useMemo, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { socket } from "./socket.js";

import { AgoraProvider } from "./AgoraContext.js";

function App() {
  const [serverModalOpen, setServerModalOpen] = useState(false);
  const [userProfileOpen, setUserProfileOpen] = useState(false);
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});
  const [unreadMsg, setUnreadMsg] = useState(false);

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
      <AgoraProvider>
        <div className="App" onClick={() => setUserProfileOpen(false)}>
          <Routes>
            {/* FRIENDS */}
            <Route
              exact
              path="/"
              element={
                <>
                  <ServersBar
                    unreadMsg={unreadMsg}
                    setUnreadMsg={setUnreadMsg}
                    toggleModal={toggleServerModal}
                    token={token}
                  />{" "}
                  <FriendsPage
                    setUnreadMsg={setUnreadMsg}
                    token={token}
                    user={user}
                    page="friends-list"
                  />
                </>
              }
            ></Route>
            <Route
              exact
              path="/messages/:friendId"
              element={
                <>
                  <ServersBar
                    unreadMsg={unreadMsg}
                    setUnreadMsg={setUnreadMsg}
                    toggleModal={toggleServerModal}
                    token={token}
                  />{" "}
                  <FriendsPage
                    setUnreadMsg={setUnreadMsg}
                    token={token}
                    user={user}
                    page="dms"
                  />
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
              path="/servers/:serverId/:channelId?"
              element={
                <>
                  <ServersBar
                    unreadMsg={unreadMsg}
                    setUnreadMsg={setUnreadMsg}
                    token={token}
                    toggleModal={toggleServerModal}
                  />{" "}
                  <ServerPage
                    user={user}
                    userProfileState={[userProfileOpen, setUserProfileOpen]}
                    token={token}
                  />
                </>
              }
            ></Route>
            <Route
              exact
              path="/servers/:serverId/settings/overview"
              element={
                <ServerSettingsPage
                  givenUser={user}
                  token={token}
                  setting="overview"
                />
              }
            ></Route>
            <Route
              exact
              path="/servers/:serverId/settings/channels"
              element={
                <ServerSettingsPage
                  givenUser={user}
                  token={token}
                  setting="channels"
                />
              }
            ></Route>
            <Route
              exact
              path="/servers/:serverId/settings/roles"
              element={
                <ServerSettingsPage
                  givenUser={user}
                  token={token}
                  setting="roles"
                />
              }
            ></Route>
            <Route
              exact
              path="/servers/:serverId/settings/invites"
              element={
                <ServerSettingsPage
                  givenUser={user}
                  token={token}
                  setting="invites"
                />
              }
            ></Route>
            <Route
              exact
              path="/servers/:serverId/settings/bans"
              element={
                <ServerSettingsPage
                  givenUser={user}
                  token={token}
                  setting="bans"
                />
              }
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

            <Route
              exact
              path="/invite/:serverId/:inviteCode"
              element={<InviteBuffer token={token} />}
            ></Route>
          </Routes>
          {serverModalOpen && (
            <ServerCreationModal
              token={token}
              toggleModal={toggleServerModal}
            />
          )}
        </div>
      </AgoraProvider>
    </Router>
  );
}

export default App;
