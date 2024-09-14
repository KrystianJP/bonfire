import FriendsBar from "./FriendsBar";
import ProfileBar from "./ProfileBar";
import FriendsList from "./FriendsList";
import DMs from "./DMs";
function FriendsPage() {
  return (
    <div className="friends-page">
      <FriendsBar />
      <ProfileBar />
      <FriendsList />
    </div>
  );
}

export default FriendsPage;
