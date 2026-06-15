import { useEffect, useState } from "react";
import { socket } from "../socket.js";

function UsersInCall({ user, friend }) {
  const [users, setUsers] = useState([]); // list of ids
  const [container, setContainer] = useState(null);
  const defaultPfp =
    "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg";

  useEffect(() => {
    if (!user.id || !friend.id) return;
    socket.emit(
      "get_current_users",
      "friend" +
        Math.min(user.id, friend.id) +
        "," +
        Math.max(user.id, friend.id),
      (usersInCall) => {
        setUsers(usersInCall);
      },
    );

    socket.on("joined_voice_call_for_users_in_call", (data) => {
      setUsers((prev) => {
        return [...prev, data.userid];
      });
    });

    socket.on("left_voice_call_for_users_in_call", (data) => {
      setUsers((prev) => {
        return prev.filter((id) => id !== data.userid);
      });
    });

    socket.on("user_left_voice_for_users_in_call", () => {
      setUsers((prev) => {
        return prev.filter((id) => id !== user.id);
      });
    });

    socket.on("user_joined_voice_for_users_in_call", () => {
      setUsers((prev) => {
        return [...prev, user.id];
      });
    });

    return () => {
      socket.off("joined_voice_call_for_users_in_call");
      socket.off("left_voice_call_for_users_in_call");
      socket.off("user_left_voice_for_users_in_call");
      socket.off("user_joined_voice_for_users_in_call");
    };
  }, [user, friend]);

  useEffect(() => {
    if (!container) return;
    container.style.height = "calc(100vh - 52px - 72px - 15px - 52px)";

    return () => {
      container.style.height = "calc(100vh - 52px - 72px - 15px)";
    };
  }, [container]);

  useEffect(() => {
    setContainer(document.querySelector(".messages-container"));
  }, []);

  return (
    <div className="users-in-call">
      In Call:
      {users.includes(user.id) && (
        <div className="user-in-call message-pfp">
          <img
            src={user.pfp ? user.pfp : defaultPfp}
            onError={(e) => {
              e.currentTarget.src = defaultPfp;
            }}
            alt="user"
            className="pfp-img"
          />
        </div>
      )}
      {users.includes(friend.id) && (
        <div className="user-in-call message-pfp">
          <img
            src={friend.pfp ? friend.pfp : defaultPfp}
            onError={(e) => {
              e.currentTarget.src = defaultPfp;
            }}
            alt="friend"
            className="pfp-img"
          />
        </div>
      )}
    </div>
  );
}

export default UsersInCall;
