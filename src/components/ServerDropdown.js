import { Link, useParams } from "react-router-dom";

function ServerDropdown({ user }) {
  const { serverId } = useParams();
  // *** leaving server
  return (
    <div
      className="server-dropdown"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {user.roles.some((role) => role.server_admin) && (
        <Link
          to={`/servers/${serverId}/settings/overview`}
          className="server-dropdown-item"
        >
          {" "}
          Server Settings
        </Link>
      )}

      {/* <label className="server-dropdown-item checkbox-item">
        Mute server
        <label className="checkbox-container">
          <input type="checkbox" className="checkbox" name="mute-server" />
          <span className="checkmark">
            <span className=" material-icons">check</span>
          </span>
        </label>
      </label>
      <label className="server-dropdown-item checkbox-item">
        Mute @role mentions
        <label className="checkbox-container">
          <input
            type="checkbox"
            className="checkbox"
            name="mute-role-mentions"
          />
          <span className="checkmark material-icons">
            <span className=" material-icons">check</span>
          </span>
        </label>
      </label> */}
      <div className="server-dropdown-item dangerous-icon">Leave server</div>
    </div>
  );
}

export default ServerDropdown;
