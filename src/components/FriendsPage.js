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
  const [unread, setUnread] = useState({}); // {friendId: true}
  const [inVoice, setInVoice] = useState({});

  useEffect(() => {
    if (!token) return;
    fetch("/api/friends", {
      method: "GET",
      headers: { authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setFriends(data.friends);
        let tempUnread = {};
        data.friends.forEach((friend) => {
          for (let i = 0; i < data.unread.length; i++) {
            if (data.unread[i].sender === friend.id) {
              tempUnread[friend.id] = true;
              break;
            }
          }
          tempUnread[friend.id] = false;
        });
        setUnread(tempUnread);
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
            return { ...friend, online: true };
          }
          return friend;
        });
      });
    });

    socket.on("disconnected_user", (id) => {
      setFriends((friends) => {
        return friends.map((friend) => {
          if (friend.id === id) {
            return { ...friend, online: false };
          }
          return friend;
        });
      });
    });

    socket.on("joined_voice_call", (data) => {
      setInVoice((prev) => {
        return { ...prev, [data.userid]: true };
      });
    });

    socket.on("left_voice_call", (data) => {
      socket.emit("get_current_users", data.channelId, (users) => {
        if (users.length === 0) {
          setInVoice((prev) => {
            return { ...prev, [data.userid]: false };
          });
        }
      });
    });

    return () => {
      socket.emit("left_page", friends);
      socket.off("connected_user");
      socket.off("disconnected_user");
      socket.off("joined_voice_call");
      socket.off("left_voice_call");
    };
  }, [friends, socket]);

  useEffect(() => {
    if (!friends || !user) return;
    // checking if any friends are in private call with user
    friends.forEach((friend) => {
      socket.emit(
        "get_current_users",
        "friend" +
          Math.min(user.id, friend.id) +
          "," +
          Math.max(user.id, friend.id),
        (users) => {
          setInVoice((prev) => {
            return {
              ...prev,
              [friend.id]: users.includes(user.id) || users.includes(friend.id),
            };
          });
        },
      );
    });
  }, [friends, user]);

  return (
    <div className="friends-page">
      <FriendsBar
        unread={unread}
        setUnread={setUnread}
        token={token}
        friends={friends}
        inVoice={inVoice}
      />
      {Object.keys(user).length > 0 && (
        <ProfileBar setInVoice={setInVoice} user={user} />
      )}
      {page === "friends-list" && (
        <FriendsList token={token} setRefresh={setRefresh} friends={friends} />
      )}
      {page === "dms" && (
        <DMs
          user={user}
          token={token}
          friendInfo={currentFriend}
          unread={unread}
          setUnread={setUnread}
          setInVoice={setInVoice}
          inVoice={inVoice[currentFriend.id] || false}
        />
      )}
    </div>
  );
}

export default FriendsPage;
