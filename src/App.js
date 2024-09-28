import ServersBar from "./components/ServersBar";
import FriendsPage from "./components/FriendsPage";
import ServerPage from "./components/ServerPage";
import SettingsPage from "./components/Settings/SettingsPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import ServerSettingsPage from "./components/ServerSettings/ServerSettingsPage";
import ChannelCreationModal from "./components/ChannelCreationModal";
import { useState } from "react";

function App() {
  const [channelModalOpen, setChannelModalOpen] = useState(false);

  function toggleChannelModal(e) {
    setChannelModalOpen(!channelModalOpen);
    e.stopPropagation();
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* FRIENDS */}
          <Route
            exact
            path="/"
            element={
              <>
                <ServersBar /> <FriendsPage page="friends-list" />
              </>
            }
          ></Route>
          <Route
            exact
            path="/messages/:username"
            element={
              <>
                <ServersBar /> <FriendsPage page="dms" />
              </>
            }
          ></Route>

          {/* SETTINGS */}
          <Route
            exact
            path="/settings/account"
            element={<SettingsPage setting="account" />}
          ></Route>
          <Route
            exact
            path="/settings/privacy"
            element={<SettingsPage setting="privacy" />}
          ></Route>
          <Route
            exact
            path="/settings/appearance"
            element={<SettingsPage setting="appearance" />}
          ></Route>
          <Route
            exact
            path="/settings/voicevideo"
            element={<SettingsPage setting="voicevideo" />}
          ></Route>

          {/* SERVERS */}
          <Route
            exact
            path="/servers/:serverId/:channelId"
            element={
              <>
                <ServersBar />{" "}
                <ServerPage toggleChannelModal={toggleChannelModal} />
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
        </Routes>
        {channelModalOpen && (
          <ChannelCreationModal toggleModal={toggleChannelModal} />
        )}
      </div>
    </Router>
  );
}

export default App;
