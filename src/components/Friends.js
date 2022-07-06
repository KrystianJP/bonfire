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
        <ul className="dms">
          <li className="friend">
            <img
              src="https://imgs.search.brave.com/wh5kF-lH3Dj8lTxUgVBoH6Tk42Cq1c1490sUSORLRyk/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvcHJl/dmlld3MvMDAwLzU1/MS81OTkvb3JpZ2lu/YWwvdXNlci1pY29u/LXZlY3Rvci5qcGc"
              alt="profile"
              className="friend-pfp"
            />
            <span className="friend-name">
              Placeholderaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            </span>
          </li>
        </ul>
      </div>
      <AddFriend />
    </div>
  );
}

export default Friends;
