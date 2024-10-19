import FriendsBar from "./FriendsBar";
import ProfileBar from "./ProfileBar";
import FriendsList from "./FriendsList";
import DMs from "./DMs";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { socket } from "../socket.js";

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

  useEffect(() => {
    if (friends.length === 0) return;
    socket.emit("entered_page", friends);

    socket.on("connected_user", (id) => {
      setFriends((friends) => {
        return friends.map((friend) => {
          if (friend.id === id) {
            friend.online = true;
          }
          return friend;
        });
      });
    });

    return () => {
      socket.emit("left_page", friends);
    };
  }, [friends, socket]);

  return (
    <div className="friends-page">
      <FriendsBar setFriends={setFriends} token={token} friends={friends} />
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
