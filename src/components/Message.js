import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
/* eslint-disable jsx-a11y/img-redundant-alt */
function Message({ userInfo, message, roles }) {
  message.timestamp = new Date(message.msg_timestamp.replace(" ", "T"));
  const msgMonth = message.timestamp.getMonth() + 1;
  const formattedTimestamp = `${message.timestamp.getDate()}/${doubleDigit(
    msgMonth,
  )}/${message.timestamp.getFullYear()} ${doubleDigit(
    message.timestamp.getHours(),
  )}:${doubleDigit(message.timestamp.getMinutes())}
  `;

  const [author, setAuthor] = useState(userInfo);

  function getRoleColour() {
    if (!userInfo) return "var(--dark-text)";
    if (!roles) return "var(--dark-lightest)";

    return "#" + userInfo.roles[0].colour;
  }

  function doubleDigit(num) {
    if (num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  useEffect(() => {
    if (userInfo || !message.authorid) return;

    fetch("/api/users/get/" + message.authorid, { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        setAuthor(data);
      });
  }, [userInfo, message.authorid]);

  return (
    <div className="message-container-container">
      {author && (
        <div className="message-container">
          <div className="message-pfp">
            <img
              className="pfp-img"
              src={author.pfp}
              alt="user profile picture"
            />
          </div>
          <span
            className="message-username"
            style={{
              color: getRoleColour(),
            }}
          >
            {author.name}
          </span>
          <span className="message-date">{formattedTimestamp}</span>
          <div className="message-content">{message.msg_text}</div>
        </div>
      )}
    </div>
  );
}

export default Message;
