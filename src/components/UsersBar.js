import ServerUserProfile from "./ServerUserProfile";
import { useState } from "react";

function UsersBar({ userProfileState }) {
  // run when user clicks on user
  function openUserProfile(e) {
    // get user details
    userProfileState[1](true);
    e.stopPropagation();
  }

  // run when user clicks respective user
  // or if user clicks on App
  function closeUserProfile() {
    userProfileState.setUserProfileOpen(false);
  }

  return (
    <div className="users-bar friends-bar">
      <div className="role-group channel-group">
        <h4 className="role-group-name channel-group-name">
          ROLE NAME THAT IS VERY VERY VERY LONG
        </h4>
        <div onClick={openUserProfile} className="server-user friend-dm">
          <div className="server-user-pfp friend-pfp">
            <img
              src="https://i.pinimg.com/originals/d5/7c/eb/d57ceb9546385b8d5c224c34502ddcf6.jpg"
              alt="server user profile picture"
              className="pfp-img"
            />
          </div>
          <span className="server-user-name friend-name">
            Username that is very very very long
          </span>
        </div>
        <div className="server-user friend-dm">
          <div className="server-user-pfp friend-pfp">
            <img
              src="https://i.pinimg.com/originals/d5/7c/eb/d57ceb9546385b8d5c224c34502ddcf6.jpg"
              alt="server user profile picture"
              className="pfp-img"
            />
          </div>
          <span className="server-user-name friend-name">
            Username that is very very very long
          </span>
        </div>
        <div className="server-user friend-dm">
          <div className="server-user-pfp friend-pfp">
            <img
              src="https://i.pinimg.com/originals/d5/7c/eb/d57ceb9546385b8d5c224c34502ddcf6.jpg"
              alt="server user profile picture"
              className="pfp-img"
            />
          </div>
          <span className="server-user-name friend-name">
            Username that is very very very long
          </span>
        </div>
      </div>
      <div className="role-group channel-group">
        <h4 className="role-group-name channel-group-name">
          ROLE NAME THAT IS VERY VERY VERY LONG
        </h4>
        <div className="server-user friend-dm">
          <div className="server-user-pfp friend-pfp">
            <img
              src="https://i.pinimg.com/originals/d5/7c/eb/d57ceb9546385b8d5c224c34502ddcf6.jpg"
              alt="server user profile picture"
              className="pfp-img"
            />
          </div>
          <span className="server-user-name friend-name">
            Username that is very very very long
          </span>
        </div>
        <div className="server-user friend-dm">
          <div className="server-user-pfp friend-pfp">
            <img
              src="https://i.pinimg.com/originals/d5/7c/eb/d57ceb9546385b8d5c224c34502ddcf6.jpg"
              alt="server user profile picture"
              className="pfp-img"
            />
          </div>
          <span className="server-user-name friend-name">
            Username that is very very very long
          </span>
        </div>
        <div className="server-user friend-dm">
          <div className="server-user-pfp friend-pfp">
            <img
              src="https://i.pinimg.com/originals/d5/7c/eb/d57ceb9546385b8d5c224c34502ddcf6.jpg"
              alt="server user profile picture"
              className="pfp-img"
            />
          </div>
          <span className="server-user-name friend-name">
            Username that is very very very long
          </span>
        </div>
      </div>
      {userProfileState[0] && <ServerUserProfile />}
    </div>
  );
}

export default UsersBar;
