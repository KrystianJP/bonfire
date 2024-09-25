import { Link } from "react-router-dom";
import FriendDM from "./FriendDM";

function FriendsBar() {
  return (
    <div className="friends-bar">
      <Link to="/" className="friend-tab">
        <span className="material-icons friends-icon">group</span>
        <span className="friend-text">Friends</span>
      </Link>
      <div className="direct-msgs-txt">DIRECT MESSAGES</div>
      <FriendDM />
      <FriendDM />
    </div>
  );
}

export default FriendsBar;
