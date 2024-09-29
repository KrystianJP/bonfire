import { useParams } from "react-router-dom";
/* eslint-disable jsx-a11y/img-redundant-alt */
function Message({ friendInfo, message }) {
  const { username } = useParams();
  const user = {
    pfp: "https://i.pinimg.com/originals/d5/7c/eb/d57ceb9546385b8d5c224c34502ddcf6.jpg",
    username: "KrysJP",
  };
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
            src={friendInfo === "" ? user.pfp : friendInfo.pfp}
            alt="user profile picture"
          />
        </div>
        <span className="message-username">
          {friendInfo === "" ? user.username : username}
        </span>
        <span className="message-date">{formattedTimestamp}</span>
        <div className="message-content">{message.message}</div>
      </div>
    </div>
  );
}

export default Message;
