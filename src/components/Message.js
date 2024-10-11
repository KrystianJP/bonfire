import { useParams } from "react-router-dom";
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

  function doubleDigit(num) {
    if (num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  return (
    <div className="message-container-container">
      <div className="message-container">
        <div className="message-pfp">
          <img
            className="pfp-img"
            src={userInfo.pfp}
            alt="user profile picture"
          />
        </div>
        <span
          className="message-username"
          style={{
            color: roles ? roles[userInfo.roles[0]] : "var(--dark-lightest)",
          }}
        >
          {userInfo.name}
        </span>
        <span className="message-date">{formattedTimestamp}</span>
        <div className="message-content">{message.msg_text}</div>
      </div>
    </div>
  );
}

export default Message;
