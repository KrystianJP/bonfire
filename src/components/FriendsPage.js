import FriendsBar from "./FriendsBar";
import ProfileBar from "./ProfileBar";
import FriendsList from "./FriendsList";
import DMs from "./DMs";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function FriendsPage({ page, user, token }) {
  const { friendId } = useParams();
  const [friends, setFriends] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [currentFriend, setCurrentFriend] = useState({});

  useEffect(() => {
    if (!token) return;
    fetch("/api/friends", {
      method: "GET",
      headers: { authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setFriends(
          data.friends.map((friend) => {
            for (let i = 0; i < data.unread.length; i++) {
              if (data.unread[i].sender === friend.id) {
                friend.unread = true;
                break;
              }
            }
            return friend;
          }),
        );
      });
  }, [token, refresh]);

  useEffect(() => {
    if (friendId && friends.length > 0) {
      setCurrentFriend(friends.filter((friend) => friend.id == friendId)[0]);
    }
  }, [friendId, friends]);

  return (
    <div className="friends-page">
      <FriendsBar
        friends={friends}
        currentFriend={page === "dms" ? currentFriend : ""}
      />
      <ProfileBar user={user} />
      {page === "friends-list" && (
        <FriendsList token={token} setRefresh={setRefresh} friends={friends} />
      )}
      {page === "dms" && (
        <DMs user={user} token={token} friendInfo={currentFriend} />
      )}
    </div>
  );
}

export default FriendsPage;
