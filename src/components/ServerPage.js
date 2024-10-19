import ChannelsBar from "./ChannelsBar";
import ProfileBar from "./ProfileBar";
import Messages from "./Messages";
import UsersBar from "./UsersBar";
import ServerDropdown from "./ServerDropdown";
import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { socket } from "../socket.js";

function ServerPage({ userProfileState, user, token }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { channelId } = useParams();
  const { serverId } = useParams();

  const [users, setUsers] = useState([]);
  const [channels, setChannels] = useState([]);
  const [channelGroups, setChannelGroups] = useState([]);
  const [roles, setRoles] = useState([]);
  const [roleGroups, setRoleGroups] = useState({
    online: { name: "online", users: [] },
    offline: { name: "offline", users: [] },
  }); // { id: {name: "...", users: [users]} }
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
          { id: "online", name: "online", colour: "var(--dark-text)" },
          { id: "offline", name: "offline", colour: "var(--dark-text)" },
        ]);
        setChannelGroups(data.channel_groups);
      });
  }, [token, serverId]);

  useEffect(() => {
    if (!server.default_channel) return;
    if (!channelId) {
      window.location.href = `/servers/${serverId}/${server.default_channel}`;
    }
  }, [server, serverId, channelId]);

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
      online: {
        name: "online",
        users: [],
      },
      offline: {
        name: "offline",
        users: [],
      },
    };
    users.forEach((friend) => {
      // *** add offline part later
      if (!friend.online) {
        tempRoleGroups.offline.users.push(friend);
      } else if (friend.roles.length === 1) {
        tempRoleGroups.online.users.push(friend);
      }
      // if user's first role is not in roleGroups, add it
      else if (!tempRoleGroups[friend.roles[0].id]) {
        tempRoleGroups[friend.roles[0].id] = {
          name: friend.roles[0].name,
          users: [friend],
        };
      } else {
        tempRoleGroups[friend.roles[0].id].users.push(friend);
      }
    });

    setRoleGroups(tempRoleGroups);
  }

  useEffect(() => {
    if (users.length === 0) return;
    socket.emit("entered_page", users);

    socket.on("connected_user", (id) => {
      setUsers((friends) => {
        return friends.map((friend) => {
          if (friend.id === id) {
            return { ...friend, online: true };
          }
          return friend;
        });
      });
    });

    socket.on("disconnected_user", (id) => {
      setUsers((friends) => {
        return friends.map((friend) => {
          if (friend.id === id) {
            return { ...friend, online: false };
          }
          return friend;
        });
      });
    });

    return () => {
      socket.emit("left_page", users);
      socket.off("connected_user");
      socket.off("disconnected_user");
    };
  }, [users, socket]);

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
        users={users}
        user={user}
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
      {channelId && channels.length > 0 && users.length > 0 && users[0] && (
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
