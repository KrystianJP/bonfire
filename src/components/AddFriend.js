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
      </div>
    </div>
  );
}

export default AddFriend;
