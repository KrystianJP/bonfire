function AddFriend() {
  return (
    <div className="add-friend-page">
      <div className="add-friend-container">
        <h2>
          <label for="add-friend">Add Friend By Name</label>
        </h2>
        <p>(It's case sensitive)</p>
        <div className="add-friend-inputs-container">
          <input
            type="text"
            name="add-friend"
            id="add-friend"
            placeholder="e.g: Jerry#1234"
          ></input>
          <button type="button">
            <span class="material-symbols-outlined">send</span>Send Request
          </button>
        </div>
      </div>
      <div className="received-req">
        <h2>Received Requests</h2>
        <ul className="requests">
          <li className="req">
            <div className="req-left">
              <img
                src="https://imgs.search.brave.com/wh5kF-lH3Dj8lTxUgVBoH6Tk42Cq1c1490sUSORLRyk/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvcHJl/dmlld3MvMDAwLzU1/MS81OTkvb3JpZ2lu/YWwvdXNlci1pY29u/LXZlY3Rvci5qcGc"
                alt="profile"
                className="friend-pfp"
              />
              <span className="req-name">Placeholder</span>
            </div>
            <div className="req-right">
              <button
                type="button"
                className="accept-button accept-button-accept"
              >
                <span class="material-symbols-outlined">done</span>
              </button>
              <button
                type="button"
                className="accept-button accept-button-decline"
              >
                <span class="material-symbols-outlined">close</span>
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default AddFriend;
