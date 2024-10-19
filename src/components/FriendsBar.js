import { Link, useParams } from "react-router-dom";
import FriendDM from "./FriendDM";
import { useEffect, useState } from "react";
import { socket } from "../socket.js";

function FriendsBar({ friends, token, unread, setUnread }) {
  const { friendId } = useParams();
  const [newFriends, setNewFriends] = useState(friends);

  useEffect(() => {
    // Only set up the socket event listener if we have a valid token and friends
    if (!token || friends.length === 0) return;

    const handleUnread = (data) => {
      // If the message is from the friend we're currently viewing
      if (data.sender == friendId) {
        // Mark message as read
        fetch("/api/friends/unread/" + data.sender, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ unread: false }),
        }).then(() => {
          let tempUnread = { ...unread };
          tempUnread[data.sender] = false;
          setUnread(tempUnread);
        });
      } else {
        // If the message is from another friend, set as unread
        let tempUnread = { ...unread };
        tempUnread[data.sender] = true;
        setUnread(tempUnread);
      }
    };

    // Set up the socket event listener
    socket.on("unread", handleUnread);

    // Clean up the event listener when the component unmounts or when dependencies change
    return () => {
      socket.off("unread", handleUnread);
    };
  }, [token, friends, friendId]);

  useEffect(() => {
    setNewFriends(friends);
    // console.log(friends);
  }, [friends]);

  return (
    <div className="friends-bar">
      <Link to="/" className={"friend-tab " + (!friendId ? "highlight" : "")}>
        <span className="material-icons friends-icon">group</span>
        <span className="friend-text">Friends</span>
      </Link>
      <div className="direct-msgs-txt">DIRECT MESSAGES</div>
      {newFriends.map((friend) => {
        return (
          <FriendDM
            unread={unread[friend.id]}
            friend={friend}
            key={friend.id}
          />
        );
      })}
    </div>
  );
}

export default FriendsBar;
