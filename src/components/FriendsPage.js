import FriendsBar from "./FriendsBar";
import ProfileBar from "./ProfileBar";
import DMs from "./DMs";
function FriendsPage() {
  return (
    <div className="friends-page">
      <FriendsBar />
      <ProfileBar />
      <DMs />
    </div>
  );
}

export default FriendsPage;
