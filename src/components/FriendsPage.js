import FriendsBar from "./FriendsBar";
import ProfileBar from "./ProfileBar";
import FriendsList from "./FriendsList";
import DMs from "./DMs";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function FriendsPage({ page, user, token }) {
  const { friendUsername } = useParams();
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    if (!token) return;
    fetch("/api/friends", {
      method: "GET",
      headers: { authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setFriends(data));
  }, [token]);

  return (
    <div className="friends-page">
      <FriendsBar
        friends={friends}
        currentFriend={page === "dms" ? friendUsername : ""}
      />
      <ProfileBar user={user} />
      {page === "friends-list" && (
        <FriendsList token={token} friends={friends} />
      )}
      {page === "dms" && <DMs />}
    </div>
  );
}

export default FriendsPage;
