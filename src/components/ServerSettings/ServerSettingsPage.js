import { Link, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Overview from "./Overview";
import Roles from "./Roles";
import Invites from "./Invites";
import Bans from "./Bans";
import Channels from "./Channels";

function ServerSettingsPage({ setting, token, givenUser }) {
  // will have deletedRoles, deletedChannels... etc. state later (and added)
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
  const [bans, setBans] = useState([]); // [users]
  const [user, setUser] = useState({});

  // addition

  // deletion
  let deletedRoles = useRef([]);
  let deletedChannels = useRef([]); // just ids
  let deletedGroups = useRef([]); // just ids
  let deletedBans = useRef([]);

  const [changesButton, setChangesButton] = useState(false);
  const [busy, setBusy] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    if (!token || !serverId) return;
    fetch("/api/servers/admin/" + serverId, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.admin) {
          setAuthenticated(true);
        } else {
          window.location.href = "/servers/" + serverId;
        }
      })
      .catch((err) => console.log(err));
  }, [serverId, token]);

  useEffect(() => {
    if (token && authenticated && serverId && givenUser.id) {
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

          setUser(data.users.filter((u) => u.id === givenUser.id)[0]);

          setChannels(data.channels);
          setChannelGroups(data.channel_groups);

          setBans(data.bans);

          setBusy(false);
        });
    }
  }, [token, serverId, authenticated, givenUser.id]);

  function setState(set, value) {
    set(value);
    setChangesButton(true);
  }

  // will also include delete and add functionality
  function saveChanges() {
    if (deletedRoles.current.length > 0) {
      sendRequest(
        "/api/servers/roles/" + serverId,
        {
          roles: deletedRoles.current,
        },
        "DELETE",
      );
    }
    if (deletedGroups.current.length > 0) {
      sendRequest(
        "/api/servers/channel_groups/" + serverId,
        {
          groups: deletedGroups.current,
        },
        "DELETE",
      );
    }
    if (deletedChannels.current.length > 0) {
      sendRequest(
        "/api/servers/channels/" + serverId,
        {
          channels: deletedChannels.current,
        },
        "DELETE",
      );
    }
    if (deletedBans.current.length > 0) {
      sendRequest(
        "/api/servers/unban/" + serverId,
        {
          users: deletedBans.current,
        },
        "POST",
      );
    }
    fetch("/api/servers/settings/" + serverId, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: overview.name,
        icon: overview.icon,
        default_channel: overview.defaultChannel,
        anyone_invite: anyoneInvite,
        groups: channelGroups,
        channels,
        roles,
      }),
    });

    setChangesButton(false);
    // window.location.href =
    //   "/servers/" + serverId + "/" + overview.defaultChannel;
  }

  function sendRequest(url, data, method) {
    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
  }

  return (
    authenticated &&
    !busy && (
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
              token={token}
              serverId={serverId}
              user={user}
            />
          )}
          {!busy && setting === "roles" && (
            <Roles
              roles={roles}
              setRoles={setRoles}
              setState={setState}
              deletedRoles={deletedRoles}
              serverId={serverId}
              token={token}
            />
          )}
          {!busy && setting === "invites" && (
            <Invites
              info={anyoneInvite}
              setAnyoneInvite={setAnyoneInvite}
              setState={setState}
              token={token}
              serverId={serverId}
            />
          )}
          {!busy && setting === "bans" && (
            <Bans
              bans={bans}
              setBans={setBans}
              setState={setState}
              deletedBans={deletedBans}
            />
          )}
          {!busy && setting === "channels" && (
            <Channels
              channels={channels}
              channelGroups={channelGroups}
              setChannelGroups={setChannelGroups}
              setChannels={setChannels}
              setState={setState}
              deletedChannels={deletedChannels}
              deletedGroups={deletedGroups}
              token={token}
              serverId={serverId}
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
    )
  );
}

export default ServerSettingsPage;
