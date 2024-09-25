import FriendsBar from "./FriendsBar";
import ProfileBar from "./ProfileBar";
import FriendsList from "./FriendsList";
import DMs from "./DMs";
function FriendsPage({ page }) {
  return (
    <div className="friends-page">
      <FriendsBar />
      <ProfileBar />
      {page === "friends-list" && <FriendsList />}
      {page === "dms" && <DMs />}
    </div>
  );
}

export default FriendsPage;
