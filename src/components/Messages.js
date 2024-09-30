import { useParams } from "react-router-dom";
import Message from "./Message";
import { useState } from "react";
function Messages({ friendInfo }) {
  const { username } = useParams();

  const messages = [
    {
      username: "KrysJP",
      message: "doing alright, u?",
      timestamp: new Date(2024, 8, 29, 19, 32),
    },
    {
      username: "PickleJuice",
      message: "Yo how you doing",
      timestamp: new Date(2024, 8, 29, 19, 30),
    },
  ];
  return (
    <div className="messages-bar">
      <div className="messages-container">
        {messages.map((message) => (
          <Message
            friendInfo={friendInfo[message.username]}
            message={message}
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
