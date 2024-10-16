/* eslint-disable jsx-a11y/img-redundant-alt */
import { useState } from "react";
import { Link } from "react-router-dom";

function ServerUserProfile({ user, roles }) {
  const [roleListOpen, setRoleListOpen] = useState(false);
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
              return (
                <div className="user-role" key={user.roles.indexOf(role)}>
                  <div
                    className="role-color"
                    style={{
                      background: roles.filter((r) => r.name === role)[0]
                        .colour,
                    }}
                  ></div>
                  {role}
                </div>
              );
            })}
            <div
              className="user-role add-role"
              onClick={() => {
                setRoleListOpen(!roleListOpen);
              }}
            >
              <div className="role-color"></div>

              <span className="material-icons">add</span>
            </div>
          </div>
          {roleListOpen && (
            <div>
              <div className="user-role-list">
                {roles.map((role) => {
                  if (role.name === "online") return null;
                  return (
                    <label
                      key={role.id}
                      className="server-dropdown-item checkbox-item"
                    >
                      {role.name}
                      <label className="checkbox-container">
                        <input
                          defaultChecked={user.roles.includes(role.name)}
                          type="checkbox"
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
              <button className="role-apply-button">Apply</button>
            </div>
          )}

          <label
            className="server-dropdown-item checkbox-item"
            style={{ marginTop: "15px" }}
          >
            Mute
            <label className="checkbox-container">
              <input type="checkbox" className="checkbox" name="mute-server" />
              <span className="checkmark">
                <span className=" material-icons">check</span>
              </span>
            </label>
          </label>
          {/* <label className="server-dropdown-item checkbox-item">
            Disable video
            <label className="checkbox-container">
              <input type="checkbox" className="checkbox" name="mute-server" />
              <span className="checkmark">
                <span className=" material-icons">check</span>
              </span>
            </label>
          </label> */}
          <div className="server-dropdown-item dangerous-icon">Kick User</div>
          <div className="server-dropdown-item dangerous-icon">Ban User</div>

          <div className="user-profile-buttons">
            <Link to="/messages/1" className="button">
              <span className="material-icons" style={{ fontSize: "1.3rem" }}>
                message
              </span>
            </Link>
            <div className="button">
              <span className="material-icons" style={{ fontSize: "1.3rem" }}>
                person_add
              </span>
            </div>
            <div className="button">
              <span className="material-icons">block</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServerUserProfile;
