import { useState } from "react";

function Privacy({ info, setPrivacy, setState }) {
  function toggle(index, state) {
    if (index === 0 && !state[0]) {
      return [true, true, true];
    } else if (index > 0 && state[0]) {
      return [
        false,
        index === 1 ? !state[1] : state[1],
        index === 2 ? !state[2] : state[2],
      ];
    }
    return [...state.slice(0, index), !state[index], ...state.slice(index + 1)];
  }

  return (
    <div className="privacy-page settings-content">
      <h1>Privacy</h1>
      <div className="setting-container">
        <div className="setting-label">WHO CAN SEND MESSAGES?</div>
        <div className="setting-toggle">
          <label className="label" htmlFor="everyone-message-toggle">
            Everyone
          </label>
          <label className="switch">
            <input
              type="checkbox"
              id="everyone-message-toggle"
              checked={info.messages[0]}
              onChange={() =>
                setState(setPrivacy, {
                  ...info,
                  messages: toggle(0, info.messages),
                })
              }
            />
            <span className="slider round"></span>
          </label>
        </div>
        <div className="setting-toggle">
          <label className="label" htmlFor="server-message-toggle">
            Server Members + Friends
          </label>
          <label className="switch">
            <input
              type="checkbox"
              id="server-message-toggle"
              checked={info.messages[1]}
              onChange={() =>
                setState(setPrivacy, {
                  ...info,
                  messages: toggle(1, info.messages),
                })
              }
            />
            <span className="slider round"></span>
          </label>
        </div>
        <div className="setting-toggle">
          <label className="label" htmlFor="friend-message-toggle">
            Friends Only
          </label>
          <label className="switch">
            <input
              type="checkbox"
              id="friend-message-toggle"
              checked={info.messages[2]}
              onChange={() =>
                setState(setPrivacy, {
                  ...info,
                  messages: toggle(2, info.messages),
                })
              }
            />
            <span className="slider round"></span>
          </label>
        </div>
      </div>
      <div className="setting-container">
        <div className="setting-label">WHO CAN SEND YOU A FRIEND REQUEST?</div>
        <div className="setting-toggle">
          <label className="label" htmlFor="everyone-friend-toggle">
            Everyone
          </label>
          <label className="switch">
            <input
              type="checkbox"
              id="everyone-friend-toggle"
              checked={info.friendRequests[0]}
              onChange={() =>
                setState(setPrivacy, {
                  ...info,
                  friendRequests: toggle(0, info.friendRequests),
                })
              }
            />
            <span className="slider round"></span>
          </label>
        </div>
        <div className="setting-toggle">
          <label className="label" htmlFor="friend-friend-toggle">
            Friends of Friends
          </label>
          <label className="switch">
            <input
              type="checkbox"
              id="friend-friend-toggle"
              checked={info.friendRequests[1]}
              onChange={() =>
                setState(setPrivacy, {
                  ...info,
                  friendRequests: toggle(1, info.friendRequests),
                })
              }
            />
            <span className="slider round"></span>
          </label>
        </div>
        <div className="setting-toggle">
          <label className="label" htmlFor="server-friend-toggle">
            Server Members
          </label>
          <label className="switch">
            <input
              type="checkbox"
              id="server-friend-toggle"
              checked={info.friendRequests[2]}
              onChange={() =>
                setState(setPrivacy, {
                  ...info,
                  friendRequests: toggle(2, info.friendRequests),
                })
              }
            />
            <span className="slider round"></span>
          </label>
        </div>
      </div>
    </div>
  );
}

export default Privacy;
