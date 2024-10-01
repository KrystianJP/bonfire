/* eslint-disable jsx-a11y/img-redundant-alt */
import ServerUserProfile from "./ServerUserProfile";
import { useState, useEffect } from "react";

function UsersBar({ userProfileState, friendInfo, roles, roleGroups }) {
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
  }, [userProfileState[0]]);

  return (
    <div className="users-bar">
      {Object.keys(roles).map((role) => {
        // if role in roleGroups, display the users in that group
        if (Object.keys(roleGroups).includes(role)) {
          return (
            <div className="role-group channel-group" key={role}>
              <h4 className="role-group-name channel-group-name">
                {role.toUpperCase()}
              </h4>
              {roleGroups[role].map((user) => {
                return (
                  <div
                    onClick={(e) => {
                      if (user.username === currentUser.username) {
                        closeUserProfile();
                        return;
                      }
                      openUserProfile(e, user);
                    }}
                    className={
                      "server-user friend-dm" +
                      (user.username === currentUser.username
                        ? " highlight"
                        : "")
                    }
                    key={user.username}
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
                      style={{ color: roles[role] }}
                    >
                      {user.username}
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
