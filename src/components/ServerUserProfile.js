/* eslint-disable jsx-a11y/img-redundant-alt */
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { socket } from "../socket.js";

function ServerUserProfile({ user, roles, configureRoleGroups, actualUser }) {
  const { serverId } = useParams();
  const [roleListOpen, setRoleListOpen] = useState(false);
  const [roleList, setRoleList] = useState(user.roles);
  const [friendRequestIcon, setFriendRequestIcon] = useState(false);

  function sendFriendRequest() {
    let token = localStorage.getItem("token");
    if (!token) return;
    fetch("api/friends/" + user.name, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "User not found") {
          alert("User not found");
        } else if (data.message === "success") {
          setFriendRequestIcon("person_check");
        }
      })
      .catch((err) => console.log(err));
  }

  function applyRoles() {
    setRoleListOpen(false);
    fetch("/api/servers/roles/apply/" + serverId, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ roles: roleList, userid: user.id }),
    });
    user.roles = roleList;
    configureRoleGroups();
  }

  function checkBoxChange(e) {
    if (e.target.checked) {
      let tempList = [
        ...roleList,
        roles.filter((role) => role.id == e.target.value)[0],
      ];
      tempList.sort((a, b) => {
        if (a.rolenr === null) {
          return 1;
        } else if (b.rolenr === null) {
          return -1;
        } else {
          return a.rolenr - b.rolenr;
        }
      });

      setRoleList(tempList);
    } else {
      setRoleList(roleList.filter((role) => role.id != e.target.value));
    }
  }

  function kickUser() {
    let token = localStorage.getItem("token");
    if (!token) return;
    fetch("/api/servers/kick/" + serverId + "/" + user.id, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "User not found") {
          alert("User not found");
        } else if (data.message === "success") {
          socket.emit("kicked_user", { userid: user.id, serverid: serverId });
          window.location.reload();
        }
      })
      .catch((err) => console.log(err));
  }

  function banUser() {
    let token = localStorage.getItem("token");
    if (!token) return;
    fetch("/api/servers/ban/" + serverId + "/" + user.id, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "User not found") {
          alert("User not found");
        } else if (data.message === "success") {
          socket.emit("kicked_user", { userid: user.id, serverid: serverId });
          window.location.reload();
        }
      })
      .catch((err) => console.log(err));
  }

  function setOwner() {
    let token = localStorage.getItem("token");
    if (!token) return;
    fetch("/api/servers/owner/" + serverId + "/" + user.id, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "User not found") {
          alert("User not found");
        } else if (data.message === "success") {
          window.location.reload();
        }
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    if (!user.id || !actualUser) return;

    // if it's the user's own profile
    if (user.id === actualUser.id) {
      setFriendRequestIcon(false);
      return;
    }

    let token = localStorage.getItem("token");
    if (!token) return;

    fetch("/api/friends/is_friend/" + user.id, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          setFriendRequestIcon(false);
        } else {
          setFriendRequestIcon(true);
        }
      })
      .catch((err) => console.log(err));
  }, [user.id, actualUser.id]);

  return (
    <div className="server-user-profile-container">
      <div
        className="server-user-profile dm-profile-bar"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div
          className="dm-profile-top"
          style={{ background: "#" + user.banner }}
        >
          <div className="dm-profile-pfp">
            <img
              src={user.pfp}
              alt="user profile picture"
              className="pfp-img"
            />
          </div>
        </div>

        <div className="dm-profile-details">
          <span className="dm-profile-name">{user.name}</span>
          <div className="about-me">
            <div className="about-me-content">{user.about}</div>
          </div>

          <div className="user-roles">
            {user.roles.map((role) => {
              if (role.id === "online" || role.id === "offline") return null;
              return (
                <div className="user-role" key={role.id}>
                  <div
                    className="role-color"
                    style={{
                      backgroundColor: "#" + role.colour,
                    }}
                  ></div>
                  {role.name}
                </div>
              );
            })}
            {actualUser.roles.some((role) => role.server_admin) && (
              <div
                className="user-role add-role"
                onClick={() => {
                  setRoleListOpen(!roleListOpen);
                }}
              >
                <div className="role-color"></div>

                <span className="material-icons">add</span>
              </div>
            )}
          </div>
          {roleListOpen && (
            <div>
              <div className="user-role-list">
                {roles.map((role) => {
                  if (
                    role.id === "online" ||
                    role.id === "offline" ||
                    (role.server_admin &&
                      !actualUser.roles[actualUser.roles.length - 1]
                        .server_admin)
                  )
                    return null;
                  return (
                    <label
                      key={role.id}
                      className="server-dropdown-item checkbox-item"
                    >
                      {role.name}
                      <label className="checkbox-container">
                        <input
                          defaultChecked={user.roles.some(
                            (r) => r.id == role.id,
                          )}
                          type="checkbox"
                          value={role.id}
                          onChange={checkBoxChange}
                          className="checkbox"
                          name="mute-server"
                        />
                        <span className="checkmark">
                          <span className=" material-icons">check</span>
                        </span>
                      </label>
                    </label>
                  );
                })}
              </div>
              <button className="role-apply-button" onClick={applyRoles}>
                Apply
              </button>
            </div>
          )}
          {user.id !== actualUser.id &&
            actualUser.roles.some((role) => role.server_admin) && (
              <div>
                {/* <label
                  className="server-dropdown-item checkbox-item"
                  style={{ marginTop: "15px" }}
                >
                  Mute
                  <label className="checkbox-container">
                    <input
                      type="checkbox"
                      className="checkbox"
                      name="mute-server"
                    />
                    <span className="checkmark">
                      <span className=" material-icons">check</span>
                    </span>
                  </label>
                </label> */}
                <div
                  className="server-dropdown-item dangerous-icon"
                  onClick={kickUser}
                >
                  Kick User
                </div>
                <div
                  className="server-dropdown-item dangerous-icon"
                  onClick={banUser}
                >
                  Ban User
                </div>
                {actualUser.roles[actualUser.roles.length - 1].server_admin && (
                  <div className="server-dropdown-item " onClick={setOwner}>
                    Set As Owner
                  </div>
                )}
              </div>
            )}

          {user.id !== actualUser.id && (
            <div className="user-profile-buttons">
              <Link to={"/messages/" + user.id} className="button">
                <span className="material-icons" style={{ fontSize: "1.3rem" }}>
                  message
                </span>
              </Link>
              {friendRequestIcon && (
                <div className="button" onClick={sendFriendRequest}>
                  <span
                    className="material-icons"
                    style={{ fontSize: "1.3rem" }}
                  >
                    person_add
                  </span>
                </div>
              )}

              {/* <div className="button">
                <span className="material-icons">block</span>
              </div> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ServerUserProfile;
