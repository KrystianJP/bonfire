import { Link } from "react-router-dom";
import FriendDM from "./FriendDM";

function FriendsBar({ friends, currentFriend }) {
  return (
    <div className="friends-bar">
      <Link
        to="/"
        className={"friend-tab " + (currentFriend === "" ? "highlight" : "")}
      >
        <span className="material-icons friends-icon">group</span>
        <span className="friend-text">Friends</span>
      </Link>
      <div className="direct-msgs-txt">DIRECT MESSAGES</div>
      {friends.map((friend) => {
        return (
          <FriendDM
            friend={friend}
            currentFriend={currentFriend}
            key={friend.username}
          />
        );
      })}
    </div>
  );
}

export default FriendsBar;
