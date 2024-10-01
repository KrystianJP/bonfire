import { useParams } from "react-router-dom";
import Message from "./Message";
import { useState } from "react";
function Messages({ friendInfo, messages, roles }) {
  const { username } = useParams();

  return (
    <div className="messages-bar">
      <div className="messages-container">
        {messages.map((message) => (
          <Message
            friendInfo={friendInfo[message.username]}
            message={message}
            key={message.timestamp}
            roles={roles}
          />
        ))}
      </div>
      <div className="message-input-container">
        <span className="material-icons attach-file-icon">attach_file</span>
        <input
          type="text"
          className="message-input"
          placeholder={"Message " + username}
        />
      </div>
    </div>
  );
}

export default Messages;
