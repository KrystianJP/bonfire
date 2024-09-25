import { Link } from "react-router-dom";

function ChannelsBar() {
  return (
    <div className="channels-bar friends-bar">
      <div className="channel-group">
        <h4 className="channel-group-name">
          CHANNEL GROUP NAME that is very long
        </h4>
        <Link to="/servers/1/14" className="channel">
          <span className="material-icons">tag</span>
          <span className="channel-name">Channel name that is very long</span>
        </Link>
        <Link to="/servers/1/14" className="channel">
          <span className="material-icons">tag</span>
          <span className="channel-name">Channel name that is very long</span>
        </Link>
        <Link to="/servers/1/14" className="channel">
          <span className="material-icons">tag</span>
          <span className="channel-name">Channel name that is very long</span>
        </Link>
      </div>
      <div className="channel-group">
        <h4 className="channel-group-name">
          CHANNEL GROUP NAME that is very long
        </h4>
        <Link to="/servers/1/14" className="channel">
          <span className="material-icons">tag</span>
          <span className="channel-name">Channel name that is very long</span>
        </Link>
        <Link to="/servers/1/14" className="channel">
          <span className="material-icons">tag</span>
          <span className="channel-name">Channel name </span>
        </Link>
        <Link to="/servers/1/14" className="channel">
          <span className="material-icons">tag</span>
          <span className="channel-name">Channel name </span>
        </Link>
      </div>
    </div>
  );
}

export default ChannelsBar;
