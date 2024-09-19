import ChannelsBar from "./ChannelsBar";
import ProfileBar from "./ProfileBar";
import Messages from "./Messages";
import UsersBar from "./UsersBar";

function ServerPage() {
  return (
    <div className="server-page">
      <div className="server-name-container">
        <span className="server-name">
          Server Name that is very very very long
        </span>
      </div>
      <ChannelsBar />
      <ProfileBar />
      <div className="top-bar top-dm-bar">
        <div className="top-bar-left-server">
          <span className="material-icons">tag</span>Channel name
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
      <Messages />
      <UsersBar />
    </div>
  );
}

export default ServerPage;
