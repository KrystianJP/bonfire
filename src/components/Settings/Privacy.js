import { useState } from "react";

function Privacy({ info }) {
  const [messages, setMessages] = useState(info.messages);
  const [requests, setRequests] = useState(info.friendRequests);

  function toggle(index, set, state) {
    if (index === 0 && !state[0]) {
      set([true, true, true]);
      return;
    } else if (index > 0 && state[0]) {
      set([
        false,
        index === 1 ? !state[1] : state[1],
        index === 2 ? !state[2] : state[2],
      ]);
      return;
    }
    set([...state.slice(0, index), !state[index], ...state.slice(index + 1)]);
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
              checked={messages[0]}
              onChange={() => toggle(0, setMessages, messages)}
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
              checked={messages[1]}
              onChange={() => toggle(1, setMessages, messages)}
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
              checked={messages[2]}
              onChange={() => toggle(2, setMessages, messages)}
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
              checked={requests[0]}
              onChange={() => toggle(0, setRequests, requests)}
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
              checked={requests[1]}
              onChange={() => toggle(1, setRequests, requests)}
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
              checked={requests[2]}
              onChange={() => toggle(2, setRequests, requests)}
            />
            <span className="slider round"></span>
          </label>
        </div>
      </div>
    </div>
  );
}

export default Privacy;
