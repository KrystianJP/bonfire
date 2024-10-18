import ChannelsBar from "./ChannelsBar";
import ProfileBar from "./ProfileBar";
import Messages from "./Messages";
import UsersBar from "./UsersBar";
import ServerDropdown from "./ServerDropdown";
import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";

function ServerPage({ toggleChannelModal, userProfileState, user, token }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { channelId } = useParams();
  const { serverId } = useParams();

  const [users, setUsers] = useState([]);
  const [channels, setChannels] = useState([]);
  const [channelGroups, setChannelGroups] = useState([]);
  const [roles, setRoles] = useState([]);
  const [roleGroups, setRoleGroups] = useState({
    online: [],
    offline: [],
  });
  const [server, setServer] = useState({});
  const [usersBarOpen, setUsersBarOpen] = useState(true);

  const [messages, setMessages] = useState([]);

  function toggleDropdown() {
    setDropdownOpen(!dropdownOpen);
  }

  useEffect(() => {
    if (!token || !serverId) return;
    fetch("/api/servers/" + serverId, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users);

        setServer(data.server);

        setChannels(data.channels);
        setRoles([
          ...data.roles,
          { id: Infinity, name: "online", colour: "var(--dark-text)" },
        ]);
        setChannelGroups(data.channel_groups);
      });
  }, [token, serverId]);

  useEffect(() => {
    if (!token || !channelId) return;
    setMessages([]);
    fetch("/api/servers/messages/" + channelId, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setMessages(data);
      });
  }, [channelId, token]);

  function configureRoleGroups() {
    let tempRoleGroups = {
      online: [],
      offline: [],
    };
    users.forEach((friend) => {
      // *** add offline part later
      if (friend.roles.length === 1) {
        tempRoleGroups.online.push(friend);
      }
      // if user's first role is not in roleGroups, add it
      else if (!tempRoleGroups[friend.roles[0]]) {
        tempRoleGroups[friend.roles[0].name] = [friend];
      } else {
        tempRoleGroups[friend.roles[0]].push(friend);
      }
    });

    setRoleGroups(tempRoleGroups);
  }

  // make role groups { group_name: [users] }
  useEffect(() => {
    if (!users) return;
    configureRoleGroups();
  }, [users]);

  return (
    <div className="server-page">
      <div className="server-name-container" onClick={toggleDropdown}>
        <span className="server-name">{server.name}</span>
        {dropdownOpen && <ServerDropdown />}
      </div>
      <ChannelsBar
        toggleChannelModal={toggleChannelModal}
        groups={channelGroups}
        channels={channels}
      />
      <ProfileBar user={user} />
      <div className="top-bar top-dm-bar">
        <div className="top-bar-left-server">
          <span className="material-icons">tag</span>
          {channels
            .filter((channel) => {
              return channel.id == channelId;
            })
            .map((channel) => {
              return channel.name;
            })}
        </div>
        <div className="top-bar-right">
          <span
            className="material-icons"
            onClick={() => setUsersBarOpen(!usersBarOpen)}
          >
            group
          </span>
          <div className="search-container">
            <span className="material-icons search-icon">search</span>
            <input
              id="server-search-bar"
              className="search-bar"
              type="text"
              placeholder="Search"
            />
          </div>
        </div>
      </div>
      {channels.length > 0 && users.length > 0 && users[0] && (
        <Messages
          users={users}
          messages={messages}
          user={user}
          roles={roles}
          placeholder={
            "#" + channels.filter((channel) => channel.id == channelId)[0].name
          }
          setMessages={setMessages}
          token={token}
        />
      )}
      {usersBarOpen && (
        <UsersBar
          userProfileState={userProfileState}
          roles={roles}
          roleGroups={roleGroups}
          configureRoleGroups={configureRoleGroups}
        />
      )}
    </div>
  );
}

export default ServerPage;
