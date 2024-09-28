import { useState } from "react";
import { Link } from "react-router-dom";

function ServerUserProfile() {
  const [roleListOpen, setRoleListOpen] = useState(false);
  return (
    <div className="server-user-profile-container">
      <div
        className="server-user-profile dm-profile-bar"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="dm-profile-top">
          <div className="dm-profile-pfp">
            <img
              src="https://i.pinimg.com/originals/d5/7c/eb/d57ceb9546385b8d5c224c34502ddcf6.jpg"
              alt="user profile picture"
              className="pfp-img"
            />
          </div>
        </div>

        <div className="dm-profile-details">
          <span className="dm-profile-name">KrysJP</span>
          <div className="about-me">
            <div className="about-me-content">
              Lorem ipsum dolor sit ametLorem ipsum dolor sit amet Lorem ipsum
              dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit
              amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem
              ipsum dolor sit amet Lorem ipsum dolor sit amet
            </div>
          </div>

          <div className="user-roles">
            <div className="user-role">
              <div className="role-color"></div>Role 1
            </div>
            <div className="user-role">
              <div className="role-color"></div>A longer role
            </div>
            <div className="user-role">
              <div className="role-color"></div>Role 1
            </div>
            <div className="user-role">
              <div className="role-color"></div>Role 1
            </div>
            <div className="user-role">
              <div className="role-color"></div>Role 1
            </div>
            <div className="user-role">
              <div className="role-color"></div>Role 1
            </div>
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
            <div className="user-role-list">
              <label className="server-dropdown-item checkbox-item">
                Role 1
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
              </label>
              <label className="server-dropdown-item checkbox-item">
                A longer role
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
              </label>
            </div>
          )}

          <label
            className="server-dropdown-item checkbox-item"
            style={{ "margin-top": "15px" }}
          >
            Mute
            <label className="checkbox-container">
              <input type="checkbox" className="checkbox" name="mute-server" />
              <span className="checkmark">
                <span className=" material-icons">check</span>
              </span>
            </label>
          </label>
          <label className="server-dropdown-item checkbox-item">
            Disable voice
            <label className="checkbox-container">
              <input type="checkbox" className="checkbox" name="mute-server" />
              <span className="checkmark">
                <span className=" material-icons">check</span>
              </span>
            </label>
          </label>

          <div className="user-profile-buttons">
            <Link to="/messages/1" className="button">
              <span
                className="material-icons"
                style={{ "font-size": "1.3rem" }}
              >
                message
              </span>
            </Link>
            <div className="button">
              <span
                className="material-icons"
                style={{ "font-size": "1.3rem" }}
              >
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
