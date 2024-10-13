import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
function ServersBar({ toggleModal, token }) {
  const { serverId } = useParams();
  const [servers, setServers] = useState([]);
  const defaultIcon =
    "https://cdn-icons-png.flaticon.com/512/16745/16745664.png";

  useEffect(() => {
    if (!token) return;

    fetch("/api/servers", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setServers(data);
      });
  }, [token]);

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
              <img
                src={server.icon ? server.icon : defaultIcon}
                alt="server icon"
                className="pfp-img"
              />
            </Link>
            <div className="tooltip-wrapper">
              <div className="tooltip">{server.name}</div>
            </div>
          </div>
        );
      })}

      <div className="server-icon-container add-server" onClick={toggleModal}>
        <span className="material-icons">add</span>
      </div>
    </div>
  );
}

export default ServersBar;
