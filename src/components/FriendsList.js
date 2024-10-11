import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function FriendsList({ friends, token, setRefresh }) {
  const defaultPfp =
    "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg";
  const [newFriend, setNewFriend] = useState("");
  const [sentMsg, setSentMsg] = useState(false);
  const [friendRequests, setFriendRequests] = useState([]);
  const [refreshRequests, setRefreshRequests] = useState(0);

  function sendFriendRequest(name) {
    if (!token) return;
    fetch("api/friends/" + name, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "User not found") {
          alert("User not found");
        } else if (data.message === "success") {
          setSentMsg(true);
          setNewFriend("");
        }
      })
      .catch((err) => console.log(err));
  }

  function acceptFriendRequest(friendId) {
    if (!token) return;
    fetch("api/friends/accept/" + friendId, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "success") {
          setRefresh(Math.random());
          setRefreshRequests(Math.random());
        }
      })
      .catch((err) => console.log(err));
  }

  function declineFriendRequest(friendId) {
    if (!token) return;
    fetch("api/friends/decline/" + friendId, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "success") {
          setRefresh(Math.random());
          setRefreshRequests(Math.random());
        }
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    if (!token) return;
    fetch("api/friends/requests", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setFriendRequests(data));
  }, [token, refreshRequests]);

  return (
    <div className="friends-list">
      <div className="search-container add-friend-container">
        <input
          id="add-friend"
          name="add-friend"
          className="search-bar"
          value={newFriend}
          onChange={(e) => {
            setNewFriend(e.target.value);
            setSentMsg(false);
          }}
          type="text"
          placeholder="Enter username to add"
        />
        <button
          className="add-friend-button"
          onClick={() => sendFriendRequest(newFriend)}
        >
          Send Friend Request
        </button>
      </div>
      {sentMsg && <div className="sent-msg">Friend request sent!</div>}

      <div className="search-container search-friend-list">
        <span className="material-icons search-icon">search</span>
        <input
          id="friend-search-bar"
          name="friend-search-bar"
          className="search-bar"
          type="text"
          placeholder="Search friends"
        />
      </div>
      <div className="setting-container">
        <div className="setting-label">FRIENDS</div>
        <div className="role-list">
          {friends.map((friend) => {
            return (
              <div className="role-container" key={friend.name}>
                <Link to={"/messages/" + friend.username} className="role">
                  <div className="friend-left">
                    <div className="friend-pfp">
                      <img
                        className="pfp-img"
                        alt="friend profile"
                        src={friend.pfp ? friend.pfp : defaultPfp}
                      />
                    </div>
                    <span className="friend-name">{friend.name}</span>
                  </div>
                  <span className="friend-icons">
                    <span className="material-icons ">message</span>
                    <span className="material-icons ">delete</span>
                  </span>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
      <div className="setting-container">
        <div className="setting-label">FRIEND REQUESTS</div>
        <div className="role-list">
          {friendRequests.map((friend) => {
            return (
              <div className="role-container" key={friend.name}>
                <Link to={"/messages/" + friend.username} className="role">
                  <div className="friend-left">
                    <div className="friend-pfp">
                      <img
                        className="pfp-img"
                        src={friend.pfp ? friend.pfp : defaultPfp}
                        alt="friend profile"
                      />
                    </div>
                    <span className="friend-name">{friend.name}</span>
                  </div>
                  <span className="friend-icons">
                    <span
                      className="material-icons "
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        acceptFriendRequest(friend.id);
                      }}
                    >
                      check
                    </span>
                    <span
                      className="material-icons "
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        declineFriendRequest(friend.id);
                      }}
                    >
                      close
                    </span>
                  </span>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default FriendsList;
