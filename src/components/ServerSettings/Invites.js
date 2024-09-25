function Invites() {
  return (
    <div className="invites-page settings-content">
      <h1>Invites</h1>
      <div className="setting-toggle">
        <label className="label" for="invite-toggle">
          Anyone can send invites
        </label>
        <label class="switch">
          <input type="checkbox" id="invite-toggle" />
          <span class="slider round"></span>
        </label>
      </div>
      <p>(You can allow specific roles this permission)</p>
      <button className="create-invite">Create Invite Link</button>
    </div>
  );
}

export default Invites;
