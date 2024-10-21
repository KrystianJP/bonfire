import { useParams } from "react-router-dom";
import Message from "./Message";
import { useState, useEffect, useContext } from "react";
import { io } from "socket.io-client";

import { socket } from "../socket.js";
function Messages({ users, messages, roles, placeholder, token, user }) {
  const { friendId } = useParams();
  const { channelId, serverId } = useParams();
  const [msgText, setMsgText] = useState("");
  let roomId;
  if (!roles) {
    roomId =
      "friend" +
      Math.min(user.id, Number(friendId)).toString() +
      Math.max(user.id, Number(friendId)).toString();
  } else {
    roomId = "channel" + channelId;
  }
  // const [stateMessages, setStateMessages] = useState([]);

  function sendMessage() {
    if (!token || !msgText) return;
    // send message to friend
    if (friendId) {
      sendDM();
    } else if (channelId) {
      sendChannelMessage();
    }
  }

  // useEffect(() => {
  //   console.log("rerendered message");
  // }, []);

  useEffect(() => {
    if (!token) return;
    socket.emit("join_room", roomId);
    // socket.on("receive_message", (data) => {
    //   const newMessage = data.message.message;
    //   setStateMessages((prevMessages) => [newMessage, ...prevMessages]);
    // });

    return () => {
      socket.emit("leave_room", roomId);
      // socket.off("receive_message");
    };
  }, [token, roomId]);

  // useEffect(() => {
  // setMessages([]);
  //   setStateMessages([]);
  // }, [friendId, channelId]);

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

  function sendChannelMessage() {
    fetch("/api/servers/message/" + channelId, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ message: msgText, serverId }),
    })
      .then((res) => res.json())
      .then((data) => {
        setMsgText("");
        // send message to socket
        socket.emit("send_message", {
          roomId,
          message: data,
          sender: user.id,
        });
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="messages-bar">
      <div className="messages-container">
        {/* {stateMessages.map((message) => (
          <Message
            userInfo={users.filter((user) => user.id == message.authorid)[0]}
            message={message}
            key={message.id}
            roles={roles}
            token={token}
            user={user}
          />
        ))} */}
        {messages.map((message) => (
          <Message
            userInfo={users.filter((user) => user.id == message.authorid)[0]}
            message={message}
            key={message.id}
            roles={roles}
            token={token}
            user={user}
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
