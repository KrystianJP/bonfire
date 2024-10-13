import { useParams } from "react-router-dom";
import Message from "./Message";
import { useState, useEffect, useContext } from "react";
import { io } from "socket.io-client";

import { socket } from "../socket.js";
function Messages({
  users,
  messages,
  roles,
  placeholder,
  token,
  pageId,
  user,
  setMessages,
}) {
  const { friendId } = useParams();
  const { channelId } = useParams();
  const [msgText, setMsgText] = useState("");
  const roomId =
    "friend" +
    Math.min(user.id, Number(friendId)).toString() +
    Math.max(user.id, Number(friendId)).toString();
  const [stateMessages, setStateMessages] = useState([]);

  function sendMessage() {
    if (!token || !msgText) return;
    // send message to friend
    if (friendId) {
      sendDM();
    }
  }

  useEffect(() => {
    if (!token) return;
    socket.emit("join_room", roomId);
    socket.on("receive_message", (data) => {
      const newMessage = data.message.message;
      setStateMessages([newMessage, ...stateMessages]);
    });

    return () => {
      socket.emit("leave_room", roomId);
      socket.off("receive_message");
    };
  }, [token, roomId, stateMessages]);

  useEffect(() => {
    setMessages([]);
    setStateMessages([]);
  }, [friendId, channelId]);

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
        setMsgText("");
        // send message to socket
        socket.emit("send_message", {
          roomId,
          message: data,
          sender: user.id,
          receiver: Number(friendId),
        });
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="messages-bar">
      <div className="messages-container">
        {stateMessages.map((message) => (
          <Message
            userInfo={users[message.authorid]}
            message={message}
            key={[message.msg_timestamp, message.authorid, Math.random()].join(
              "-",
            )}
            roles={roles}
          />
        ))}
        {messages.map((message) => (
          <Message
            userInfo={users[message.authorid]}
            message={message}
            key={[message.msg_timestamp, message.authorid, Math.random()].join(
              "-",
            )}
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
