import { useState } from "react";

function Roles({ roles, setRoles, setState, addedRoles, deletedRoles }) {
  // set to corresponding rolenr
  const [changingName, setChangingName] = useState(-1);
  const [nameValue, setNameValue] = useState("");

  function addRole() {
    let rolenr;
    if (roles.length === 0) {
      rolenr = 0;
    } else {
      rolenr = roles[roles.length - 1].rolenr + 1;
    }

    const newRole = {
      name: "New role",
      colour: "000000",
      rolenr: rolenr,
    };

    setState(setRoles, [...roles, newRole]);
    addedRoles.current.push(newRole);
  }

  function deleteRole(rolenr) {
    deletedRoles.current.push(roles.find((role) => role.rolenr === rolenr));
    setState(
      setRoles,
      roles.filter((role) => role.rolenr !== rolenr),
    );
  }

  function moveUp(rolenr) {
    let index = roles.findIndex((role) => role.rolenr === rolenr);
    let rolesCopy = [...roles];
    let newRoleNr = rolesCopy[index - 1].rolenr;
    let temp = rolesCopy[index];
    rolesCopy[index] = rolesCopy[index - 1];
    rolesCopy[index - 1] = temp;
    roles[index - 1].rolenr = rolenr;
    roles[index].rolenr = newRoleNr;
    setState(setRoles, rolesCopy);
    setChangingName(-1);
  }
  function moveDown(rolenr) {
    let index = roles.findIndex((role) => role.rolenr === rolenr);
    let rolesCopy = [...roles];
    let newRoleNr = rolesCopy[index + 1].rolenr;
    let temp = rolesCopy[index];
    rolesCopy[index] = rolesCopy[index + 1];
    rolesCopy[index + 1] = temp;
    roles[index + 1].rolenr = rolenr;
    roles[index].rolenr = newRoleNr;
    setState(setRoles, rolesCopy);
    setChangingName(-1);
  }

  return (
    <div className="overview-page roles-page settings-content">
      <h1>Roles</h1>
      <p
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "10px",
        }}
      >
        <span className="material-icons">star</span> roles have admin
        permissions
      </p>
      <button className="create-role" onClick={addRole}>
        New Role
      </button>
      <div className="setting-container">
        <div className="setting-label">ROLES</div>

        <div className="role-list">
          {roles.map((role) => {
            return (
              <div key={role.rolenr} className="role-container">
                <div className="role">
                  <div className="friend-left">
                    <input
                      type="color"
                      className="role-color"
                      // defaultValue={"#" + role.colour}
                      value={"#" + role.colour}
                      onChange={(e) => {
                        setState(
                          setRoles,
                          roles.map((r) =>
                            r.rolenr === role.rolenr
                              ? { ...r, colour: e.target.value.slice(1) }
                              : r,
                          ),
                        );
                      }}
                      style={{ backgroundColor: "#" + role.colour }}
                    ></input>
                    {changingName !== role.rolenr ? (
                      <div className="username-container">
                        <span className="username">{role.name}</span>
                      </div>
                    ) : (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          setState(
                            setRoles,
                            roles.map((r) =>
                              r.rolenr === role.rolenr
                                ? { ...r, name: nameValue }
                                : r,
                            ),
                          );
                          setChangingName(-1);
                        }}
                        className="username-container"
                      >
                        <input
                          type="text"
                          className="search-bar"
                          value={nameValue}
                          onChange={(e) => setNameValue(e.target.value)}
                        />
                        <span
                          className="material-icons edit-icon"
                          onClick={() => {
                            setChangingName(-1);
                            setNameValue(role.name);
                          }}
                        >
                          close
                        </span>
                      </form>
                    )}
                  </div>
                  <span className="friend-icons">
                    <span
                      className="material-icons delete-icon"
                      onClick={() => deleteRole(role.rolenr)}
                    >
                      delete
                    </span>
                    <span
                      className="material-icons"
                      onClick={() =>
                        setState(
                          setRoles,
                          roles.map((r) =>
                            r.rolenr === role.rolenr
                              ? { ...r, server_admin: !role.server_admin }
                              : r,
                          ),
                        )
                      }
                    >
                      {role.server_admin ? "star" : "star_outline"}
                    </span>
                    <span className="arrows-container">
                      {role.rolenr !== roles[0].rolenr && (
                        <span
                          className="material-icons"
                          onClick={() => moveUp(role.rolenr)}
                        >
                          arrow_upward
                        </span>
                      )}
                      {role.rolenr !== roles[roles.length - 1].rolenr && (
                        <span
                          className="material-icons"
                          style={{
                            marginLeft: role.rolenr === 0 ? "24px" : "0px",
                          }}
                          onClick={() => moveDown(role.rolenr)}
                        >
                          arrow_downward
                        </span>
                      )}
                    </span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Roles;
