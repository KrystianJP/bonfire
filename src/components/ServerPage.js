import ChannelsBar from "./ChannelsBar";
import ProfileBar from "./ProfileBar";
import Messages from "./Messages";
import UsersBar from "./UsersBar";
import ServerDropdown from "./ServerDropdown";
import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";

function ServerPage({ toggleChannelModal, userProfileState, user }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { channelId } = useParams();

  function toggleDropdown() {
    setDropdownOpen(!dropdownOpen);
  }

  // THIS WILL FIND THE FRIENDS INFO BASED ON USERNAME
  // AND ONLY STORE THEIR INFO, THIS IS FOR DEMONSTRATION
  const friendInfo = {
    PickleJuice: {
      username: "PickleJuice",
      pfp: "https://imgcdn.stablediffusionweb.com/2024/4/16/7263bda6-c6d4-46f5-90d7-9a659e42bce1.jpg",
      about: "me like pickles wowowowowoowowowow whoopee",
      online: true,
      roles: ["admin", "something", "very cool"],
    },
    SomebodyElse: {
      username: "SomebodyElse",
      pfp: "https://pics.craiyon.com/2023-10-25/37325fe41b05409d89f905897c6e0da3.webp",
      about: "somebody that you used to know SOMEBODYYY",
      online: true,
      roles: ["cool"],
    },
    KrysJP: {
      username: "KrysJP",
      pfp: "https://i.pinimg.com/originals/d5/7c/eb/d57ceb9546385b8d5c224c34502ddcf6.jpg",
      about: "me like krys",
      online: true,
      roles: ["admin"],
    },
    PeanutButter: {
      username: "PeanutButter",
      pfp: "https://domf5oio6qrcr.cloudfront.net/medialibrary/1980/peanut-butter-healthy.jpg",
      about: "me like krys",
      online: false,
      roles: [],
    },
  };

  const groups = ["general", "other"];
  const channels = useMemo(
    () => [
      {
        name: "Channel 1",
        id: 1,
        type: "text",
        group: "general",
        messages: [
          {
            username: "KrysJP",
            message: "im aight",
            timestamp: new Date(2024, 8, 29, 19, 37),
          },
          {
            username: "SomebodyElse",
            message: "doing fantastic, u?",
            timestamp: new Date(2024, 8, 29, 19, 32),
          },
          {
            username: "PickleJuice",
            message: "Yo how you doing",
            timestamp: new Date(2024, 8, 29, 19, 30),
          },
        ],
      },
      {
        name: "Channel 2",
        id: 2,
        type: "text",
        group: "other",
        messages: [
          {
            username: "PeanutButter",
            message: "u kinda right mate",
            timestamp: new Date(2024, 8, 29, 19, 32),
          },
          {
            username: "KrysJP",
            message: "looking kinda empty",
            timestamp: new Date(2024, 8, 29, 19, 30),
          },
        ],
      },
      {
        name: "Voice Channel",
        id: 3,
        group: "general",
        type: "voice",
      },
    ],
    [],
  );

  const roles = {
    admin: "#ffbb00",
    something: "#ff00b3",
    "very cool": "#ff0008",
    cool: "#00d9ff",
    online: "var(--dark-text)",
    offline: "var(--dark-highlight)",
  };
  const roleGroups = { online: [], offline: [] };

  Object.values(friendInfo).forEach((friend) => {
    if (!friend.online) {
      roleGroups["offline"].push(friend);
    } else if (friend.roles.length === 0) {
      roleGroups.online.push(friend);
    }
    // if user's first role is not in roleGroups, add it
    else if (!Object.keys(roleGroups).includes(friend.roles[0])) {
      roleGroups[friend.roles[0]] = [friend];
    } else {
      roleGroups[friend.roles[0]].push(friend);
    }
  });

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
        groups={groups}
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
      <Messages
        friendInfo={friendInfo}
        messages={
          channels.filter((channel) => channel.id == channelId)[0].messages
        }
        roles={roles}
      />
      <UsersBar
        userProfileState={userProfileState}
        friendInfo={friendInfo}
        roles={roles}
        roleGroups={roleGroups}
      />
    </div>
  );
}

export default ServerPage;
