import { Link } from "react-router-dom";
function ServersBar() {
  const id = 1;
  return (
    <div className="sidebar">
      <div className="bonfire-text">
        Bon<span>fire</span>
      </div>
      <Link to="/" className="server-icon main-icon">
        <img
          src="https://i.postimg.cc/Ss8Nrrv4/bonfire-logo-transparent.png"
          alt="bonfire logo"
          className="pfp-img main-icon-img"
        />
      </Link>
      <div className="hor-line"></div>
      <div className="server-icon-container">
        <Link to={`/servers/${id}/12`} className="server-icon">
          <img
            src="https://i.pinimg.com/originals/d5/7c/eb/d57ceb9546385b8d5c224c34502ddcf6.jpg"
            alt="server icon"
            className="pfp-img"
          />
        </Link>
        <div className="tooltip-wrapper">
          <div className="tooltip">Server Name</div>
        </div>
      </div>
      <div className="server-icon-container">
        <Link to={`/servers/${id}/12`} className="server-icon">
          <img
            src="https://i.pinimg.com/originals/d5/7c/eb/d57ceb9546385b8d5c224c34502ddcf6.jpg"
            alt="server icon"
            className="pfp-img"
          />
        </Link>
        <div className="tooltip-wrapper">
          <div className="tooltip">Server Name</div>
        </div>
      </div>
    </div>
  );
}

export default ServersBar;
