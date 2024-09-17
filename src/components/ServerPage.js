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
      <div className="top-bar"></div>
      <Messages />
      <UsersBar />
    </div>
  );
}

export default ServerPage;
