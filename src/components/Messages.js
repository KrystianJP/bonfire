import Message from "./Message";
function Messages() {
  return (
    <div className="messages-bar">
      <div className="messages-container">
        <Message />
        <Message />
      </div>
      <div className="message-input-container">
        <span className="material-icons attach-file-icon">attach_file</span>
        <input
          type="text"
          className="message-input"
          placeholder="Message PickleJuice"
        />
      </div>
    </div>
  );
}

export default Messages;
