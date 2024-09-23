function Privacy() {
  return (
    <div className="privacy-page settings-content">
      <h1>Privacy</h1>
      <div className="setting-container">
        <div className="setting-label">WHO CAN SEND MESSAGES?</div>
        <div className="setting-toggle">
          <label className="label" for="everyone-message-toggle">
            Everyone
          </label>
          <label class="switch">
            <input type="checkbox" id="everyone-message-toggle" />
            <span class="slider round"></span>
          </label>
        </div>
        <div className="setting-toggle">
          <label className="label" for="server-message-toggle">
            Server Members + Friends
          </label>
          <label class="switch">
            <input type="checkbox" id="server-message-toggle" />
            <span class="slider round"></span>
          </label>
        </div>
        <div className="setting-toggle">
          <label className="label" for="friend-message-toggle">
            Friends Only
          </label>
          <label class="switch">
            <input type="checkbox" id="friend-message-toggle" />
            <span class="slider round"></span>
          </label>
        </div>
      </div>
      <div className="setting-container">
        <div className="setting-label">WHO CAN SEND YOU A FRIEND REQUEST?</div>
        <div className="setting-toggle">
          <label className="label" for="everyone-friend-toggle">
            Everyone
          </label>
          <label class="switch">
            <input type="checkbox" id="everyone-friend-toggle" />
            <span class="slider round"></span>
          </label>
        </div>
        <div className="setting-toggle">
          <label className="label" for="friend-friend-toggle">
            Friends of Friends
          </label>
          <label class="switch">
            <input type="checkbox" id="friend-friend-toggle" />
            <span class="slider round"></span>
          </label>
        </div>
        <div className="setting-toggle">
          <label className="label" for="server-friend-toggle">
            Server Members
          </label>
          <label class="switch">
            <input type="checkbox" id="server-friend-toggle" />
            <span class="slider round"></span>
          </label>
        </div>
        <div className="setting-toggle">
          <label className="label" for="nobody-friend-toggle">
            Nobody
          </label>
          <label class="switch">
            <input type="checkbox" id="nobody-friend-toggle" />
            <span class="slider round"></span>
          </label>
        </div>
      </div>
    </div>
  );
}

export default Privacy;
