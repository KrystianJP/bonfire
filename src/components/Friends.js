import AddFriend from "./AddFriend";

function Friends() {
  return (
    <div className="friends-page">
      <div className="dm-column">
        <button type="button" className="friend-add-button">
          <span class="material-symbols-outlined">group_add</span>
          Add Friend
        </button>
        <h2>
          <span className="material-symbols-outlined chat-bubble">
            chat_bubble
          </span>{" "}
          Direct Messages
        </h2>
        <ul className="dms"></ul>
      </div>
      <AddFriend />
    </div>
  );
}

export default Friends;
