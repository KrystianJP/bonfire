/* eslint-disable jsx-a11y/img-redundant-alt */
import ServerUserProfile from "./ServerUserProfile";
import { useState, useEffect } from "react";

function UsersBar({ userProfileState, friendInfo, roles, roleGroups }) {
  const [currentUser, setCurrentUser] = useState({});
  console.log(roles);

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
        // if role in roleGroups, display the users in that group
        if (Object.keys(roleGroups).includes(role.name)) {
          return (
            <div className="role-group channel-group" key={role}>
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
                    key={Math.random()}
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
                      style={{ color: role.colour }}
                    >
                      {user.name}
                    </span>
                  </div>
                );
              })}
            </div>
          );
        }
      })}

      {userProfileState[0] && (
        <ServerUserProfile roles={roles} user={currentUser} />
      )}
    </div>
  );
}

export default UsersBar;
