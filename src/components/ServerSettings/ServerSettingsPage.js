import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Overview from "./Overview";
import Roles from "./Roles";
import Invites from "./Invites";
import Bans from "./Bans";
import Channels from "./Channels";

function ServerSettingsPage({ setting, token }) {
  const { serverId } = useParams();
  const [overview, setOverview] = useState({
    name: "",
    icon: "",
    defaultChannel: "",
    ogName: "",
  });
  const [anyoneInvite, setAnyoneInvite] = useState(false);
  const [roles, setRoles] = useState([]);
  const [channels, setChannels] = useState([]);
  const [channelGroups, setChannelGroups] = useState([]);
  const [bans, setBans] = useState([]);

  const [changesButton, setChangesButton] = useState(false);
  const [busy, setBusy] = useState(true);

  useEffect(() => {
    if (token) {
      fetch("/api/servers/" + serverId, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          setOverview({
            name: data.server.name,
            icon: data.server.icon,
            defaultChannel: data.server.default_channel,
            ogName: data.server.name,
          });
          setAnyoneInvite(data.server.anyone_invite);
          setRoles(data.roles);
          setChannels(data.channels);
          setChannelGroups(data.channel_groups);
          setBans(data.bans);
          setBusy(false);
        });
    }
  }, [token, serverId]);

  function setState(set, value) {
    set(value);
    setChangesButton(true);
  }

  function saveChanges() {
    fetch("/api/servers/settings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({}),
    });
    setChangesButton(false);
    window.location.href =
      "/servers" + serverId + "/" + overview.defaultChannel;
  }

  return (
    <div className="settings-page">
      <div className="settings-side-bar-container">
        <div className="settings-side-bar">
          <h1>SERVER NAME</h1>
          <Link
            to={`/servers/${serverId}/settings/overview`}
            className={
              "settings-group" + (setting === "account" ? " highlight" : "")
            }
          >
            Overview
          </Link>
          <Link
            to={`/servers/${serverId}/settings/roles`}
            className={
              "settings-group" + (setting === "roles" ? " highlight" : "")
            }
          >
            Roles
          </Link>
          <Link
            to={`/servers/${serverId}/settings/channels`}
            className={
              "settings-group" + (setting === "channels" ? " highlight" : "")
            }
          >
            Channels
          </Link>
          <Link
            to={`/servers/${serverId}/settings/invites`}
            className={
              "settings-group" + (setting === "invites" ? " highlight" : "")
            }
          >
            Invites
          </Link>
          <Link
            to={`/servers/${serverId}/settings/bans`}
            className={
              "settings-group" + (setting === "bans" ? " highlight" : "")
            }
          >
            Bans
          </Link>
        </div>
      </div>
      <div className="settings-page-content-container">
        {!busy && setting === "overview" && (
          <Overview
            info={overview}
            setOverview={setOverview}
            setState={setState}
            channels={channels}
          />
        )}
        {!busy && setting === "roles" && (
          <Roles info={roles} setRoles={setRoles} setState={setState} />
        )}
        {!busy && setting === "invites" && (
          <Invites
            info={anyoneInvite}
            setAnyoneInvite={setAnyoneInvite}
            setState={setState}
          />
        )}
        {!busy && setting === "bans" && (
          <Bans info={bans} setBans={setBans} setState={setState} />
        )}
        {!busy && setting === "channels" && (
          <Channels
            channels={channels}
            channelGroups={channelGroups}
            setChannelGroups={setChannelGroups}
            setChannels={setChannels}
            setState={setState}
          />
        )}
      </div>
      <div className="settings-exit">
        <Link
          to={`/servers/${serverId}/${overview.defaultChannel}`}
          className="material-icons exit-icon"
        >
          close
        </Link>
      </div>
      {!busy && changesButton && (
        <button className="save-button" onClick={saveChanges}>
          Save Changes
        </button>
      )}
    </div>
  );
}

export default ServerSettingsPage;
