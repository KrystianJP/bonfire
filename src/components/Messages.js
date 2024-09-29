import { useParams } from "react-router-dom";
import Message from "./Message";
import { useState } from "react";
function Messages({ friendInfo, friendMessages, yourMessages }) {
  const { username } = useParams();
  const [messages, setMessages] = useState([
    { message: yourMessages[username].messages[0], user: "user" },
    { message: friendMessages[username].messages[0], user: "friend" },
  ]);
  return (
    <div className="messages-bar">
      <div className="messages-container">
        {messages.map((message) => (
          <Message
            friendInfo={message.user === "friend" ? friendInfo[username] : ""}
            message={message.message}
            key={message.timestamp}
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
