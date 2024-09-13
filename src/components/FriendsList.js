function FriendsList() {
  return (
    <div className="friends-list">
      <div className="search-container">
        <span className="material-icons" id="search-icon">
          search
        </span>
        <input id="search-bar" type="text" placeholder="Search" />
      </div>
    </div>
  );
}

export default FriendsList;
