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
        setChannels(data.channels);
        setRoles([
          ...data.roles,
          { name: "online", colour: "var(--dark-text)" },
        ]);
        setChannelGroups(data.channel_groups);
      });
  }, [token, serverId]);

  // make role groups { group_name: [users] }
  useEffect(() => {
    if (!users) return;
    let tempRoleGroups = {
      online: [],
      offline: [],
    };
    users.forEach((friend) => {
      if (!friend.online) {
        // *** CHANGE THIS TO OFFLINE ONCE IMPLEMENTED
        tempRoleGroups["online"].push(friend);
      } else if (friend.roles.length === 0) {
        tempRoleGroups.online.push(friend);
      }
      // if user's first role is not in roleGroups, add it
      else if (!Object.keys(tempRoleGroups).includes(friend.roles[0])) {
        tempRoleGroups[friend.roles[0]] = [friend];
      } else {
        tempRoleGroups[friend.roles[0]].push(friend);
      }
    });
    setRoleGroups(tempRoleGroups);
  }, [users]);

  return (
    <div className="server-page">
      <div className="server-name-container" onClick={toggleDropdown}>
        <span className="server-name">
          Server Name that is very very very long
        </span>
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
          <span className="material-icons">group</span>
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
      {/* <Messages
        friendInfo={friendInfo}
        messages={
          channels.filter((channel) => channel.id == channelId)[0].messages
        }
        roles={roles}
      /> */}
      <UsersBar
        userProfileState={userProfileState}
        roles={roles}
        roleGroups={roleGroups}
      />
    </div>
  );
}

export default ServerPage;
