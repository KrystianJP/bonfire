/* eslint-disable jsx-a11y/img-redundant-alt */
import ServerUserProfile from "./ServerUserProfile";
import { useState, useEffect } from "react";

function UsersBar({
  userProfileState,
  roles,
  roleGroups,
  configureRoleGroups,
}) {
  const [currentUser, setCurrentUser] = useState({});

  // run when user clicks on user
  function openUserProfile(e, user) {
    setCurrentUser(user);
    userProfileState[1](true);
    e.stopPropagation();
  }

  // run when user clicks respective user
  // or if user clicks on App
  function closeUserProfile() {
    userProfileState[1](false);
  }

  useEffect(() => {
    if (!userProfileState[0]) {
      setCurrentUser({});
    }
  }, [userProfileState]);

  return (
    <div className="users-bar">
      {roles.map((role) => {
        if (!Object.keys(roleGroups).includes(role.name)) {
          return null;
        }
        // if role in roleGroups, display the users in that group
        return (
          <div className="role-group channel-group" key={role.id}>
            <h4 className="role-group-name channel-group-name">
              {role.name.toUpperCase()}
            </h4>
            {roleGroups[role.name].map((user) => {
              return (
                <div
                  onClick={(e) => {
                    if (user.name === currentUser.name) {
                      closeUserProfile();
                      return;
                    }
                    openUserProfile(e, user);
                  }}
                  className={
                    "server-user friend-dm" +
                    (user.name === currentUser.name ? " highlight" : "")
                  }
                  key={user.id}
                >
                  <div className="server-user-pfp friend-pfp">
                    <img
                      src={user.pfp}
                      alt="server user profile picture"
                      className="pfp-img"
                    />
                  </div>
                  <span
                    className="server-user-name friend-name"
                    style={{ color: "#" + user.roles[0].colour }}
                  >
                    {user.name}
                  </span>
                </div>
              );
            })}
          </div>
        );
      })}

      {userProfileState[0] && (
        <ServerUserProfile
          roles={roles}
          user={currentUser}
          configureRoleGroups={configureRoleGroups}
        />
      )}
    </div>
  );
}

export default UsersBar;
