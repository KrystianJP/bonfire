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
    </div>
  );
}

export default FriendsList;
