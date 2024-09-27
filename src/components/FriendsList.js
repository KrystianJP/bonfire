import { Link } from "react-router-dom";

function FriendsList() {
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
          <div className="role-container">
            <Link to="/messages/SomeUsername" className="role">
              <div className="friend-pfp">
                <img
                  className="pfp-img"
                  src="https://i.pinimg.com/originals/d5/7c/eb/d57ceb9546385b8d5c224c34502ddcf6.jpg"
                />
              </div>
              <span className="friend-name">Friend 1</span>
              <span className="friend-icons unban-icon">
                <span className="material-icons ">message</span>
                <span className="material-icons ">delete</span>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FriendsList;
