import { useParams } from "react-router-dom";
import Message from "./Message";
import { useState, useEffect } from "react";
function Messages({ users, messages, roles, placeholder, token, pageId }) {
  const { friendId } = useParams();
  const { channelId } = useParams();
  const [msgText, setMsgText] = useState("");

  function sendMessage() {
    if (!token || !msgText) return;
    // send message to friend
    if (friendId) {
      sendDM();
    }
  }

  function sendDM() {
    fetch("/api/friends/message/" + friendId, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ message: msgText }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMsgText("");
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="messages-bar">
      <div className="messages-container">
        {(friendId == pageId || channelId == pageId) &&
          messages.map((message) => (
            <Message
              userInfo={users[message.authorid]}
              message={message}
              key={[message.timestamp, message.authorid].join("-")}
              roles={roles}
            />
          ))}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage();
        }}
        className="message-input-container"
      >
        <span className="material-icons attach-file-icon">attach_file</span>
        <input
          type="text"
          className="message-input"
          value={msgText}
          onChange={(e) => setMsgText(e.target.value)}
          placeholder={"Message " + (placeholder ? placeholder : "")}
        />
      </form>
    </div>
  );
}

export default Messages;
