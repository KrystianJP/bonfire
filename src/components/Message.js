import { useParams } from "react-router-dom";
/* eslint-disable jsx-a11y/img-redundant-alt */
function Message({ friendInfo, message, roles }) {
  const { username } = useParams();
  const msgMonth = message.timestamp.getMonth() + 1;
  const formattedTimestamp = `${message.timestamp.getDate()}/${
    msgMonth < 10 ? `0${msgMonth}` : msgMonth
  }/${message.timestamp.getFullYear()} ${message.timestamp.getHours()}:${message.timestamp.getMinutes()}`;
  return (
    <div className="message-container-container">
      <div className="message-container">
        <div className="message-pfp">
          <img
            className="pfp-img"
            src={friendInfo.pfp}
            alt="user profile picture"
          />
        </div>
        <span
          className="message-username"
          style={{
            color: roles ? roles[friendInfo.roles[0]] : "var(--dark-lightest)",
          }}
        >
          {message.username}
        </span>
        <span className="message-date">{formattedTimestamp}</span>
        <div className="message-content">{message.message}</div>
      </div>
    </div>
  );
}

export default Message;
