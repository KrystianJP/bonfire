import FriendDM from "./FriendDM";

function FriendsBar() {
  return (
    <div className="friends-bar">
      <div className="friend-tab">
        <span className="material-icons friends-icon">group</span>
        <span className="friend-text">Friends</span>
      </div>
      <div className="direct-msgs-txt">DIRECT MESSAGES</div>
      <FriendDM />
    </div>
  );
}

export default FriendsBar;
