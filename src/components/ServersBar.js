import { Link, useParams } from "react-router-dom";
function ServersBar({ servers }) {
  const { serverId } = useParams();
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
      {servers.map((server) => {
        return (
          <div key={server.id} className="server-icon-container">
            <Link
              to={`/servers/${server.id}/1`}
              className={
                "server-icon" + (serverId == server.id ? " current-server" : "")
              }
            >
              <img src={server.icon} alt="server icon" className="pfp-img" />
            </Link>
            <div className="tooltip-wrapper">
              <div className="tooltip">{server.name}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ServersBar;
