import { useState } from "react";
import { Link, useParams } from "react-router-dom";

function ServerDropdown({ user, token }) {
  const { serverId } = useParams();
  const [inviteText, setInviteText] = useState("Copy Invite Link");

  function leaveServer() {
    fetch("/api/servers/leave/" + serverId, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => (window.location.href = "/"))
      .catch((err) => console.log(err));
  }

  function copyInviteLink() {
    fetch("/api/servers/invite/" + serverId, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        navigator.clipboard.writeText(
          window.location.origin +
            "/invite/" +
            serverId +
            "/" +
            data.inviteCode,
        );
        setInviteText("Copied!");
        window.setTimeout(() => setInviteText("Copy Invite Link"), 2000);
      })
      .catch((err) => console.log(err));
  }

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

      <div
        className="server-dropdown-item invite-dropdown-item"
        onClick={copyInviteLink}
      >
        {inviteText}
      </div>

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
      {!user.roles[user.roles.length - 1].server_admin && (
        <div
          className="server-dropdown-item dangerous-icon"
          onClick={leaveServer}
        >
          Leave server
        </div>
      )}
    </div>
  );
}

export default ServerDropdown;
