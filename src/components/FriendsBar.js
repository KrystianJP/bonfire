import { Link, useParams } from "react-router-dom";
import FriendDM from "./FriendDM";
import { useEffect, useState } from "react";
import { socket } from "../socket.js";

function FriendsBar({ friends, token }) {
  const { friendId } = useParams();
  const [newFriends, setNewFriends] = useState(friends);
  const [currentFriend, setCurrentFriend] = useState({});

  useEffect(() => {
    if (!token || friends.length === 0) return;
    socket.on("unread", (data) => {
      // console.log("unread", data);
      if (data.sender === currentFriend.id) {
        // set unread back to false since message seen
        fetch("/api/friends/unread/" + data.sender, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ unread: false }),
        }).then(() => {
          setNewFriends((friends) => {
            return friends.map((friend) => {
              if (friend.id === data.sender) {
                console.log("setting unread to false");
                friend.unread = false;
              }
              return friend;
            });
          });
        });
        return;
      }
      setNewFriends((friends) => {
        return friends.map((friend) => {
          if (friend.id === data.sender) {
            friend.unread = true;
          }
          return friend;
        });
      });
    });
  }, [token, friends]);

  useEffect(() => {
    if (friends.length === 0) return;
    setCurrentFriend(friends.filter((friend) => friend.id == friendId)[0]);
  }, [friends, friendId]);

  useEffect(() => {
    setNewFriends(friends);
  }, [friends]);

  return (
    <div className="friends-bar">
      <Link
        to="/"
        className={"friend-tab " + (!currentFriend ? "highlight" : "")}
      >
        <span className="material-icons friends-icon">group</span>
        <span className="friend-text">Friends</span>
      </Link>
      <div className="direct-msgs-txt">DIRECT MESSAGES</div>
      {newFriends.map((friend) => {
        return (
          <FriendDM
            friend={friend}
            currentFriend={currentFriend}
            key={friend.name}
          />
        );
      })}
    </div>
  );
}

export default FriendsBar;
