function Roles({ roles, setRoles, setState, addedRoles }) {
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

  return (
    <div className="overview-page settings-content">
      <h1>Roles</h1>
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
                  <input
                    type="color"
                    className="role-color"
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
                  {role.name}
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
