import { Link } from "react-router-dom";

function FriendsList({ friends }) {
  return (
    <div className="friends-list">
      <div className="search-container">
        <span className="material-icons search-icon">search</span>
        <input
          id="friend-search-bar"
          className="search-bar"
          type="text"
          placeholder="Search"
        />
      </div>
      <div className="setting-container">
        <div className="setting-label">FRIENDS</div>
        <div className="role-list">
          {friends.map((friend) => {
            return (
              <div className="role-container" key={friend.username}>
                <Link to={"/messages/" + friend.username} className="role">
                  <div className="friend-left">
                    <div className="friend-pfp">
                      <img className="pfp-img" src={friend.pfp} />
                    </div>
                    <span className="friend-name">{friend.username}</span>
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
    </div>
  );
}

export default FriendsList;
