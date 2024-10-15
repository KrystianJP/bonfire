function Invites({ info, setAnyoneInvite, setState }) {
  return (
    <div className="invites-page settings-content">
      <h1>Invites</h1>
      <div className="setting-toggle">
        <label className="label" htmlFor="invite-toggle">
          Anyone can send invites
        </label>
        <label className="switch">
          <input
            defaultChecked={info}
            type="checkbox"
            id="invite-toggle"
            onChange={(e) => {
              setState(setAnyoneInvite, e.target.checked);
            }}
          />
          <span className="slider round"></span>
        </label>
      </div>
      <p>(You can allow specific roles this permission)</p>
      <button className="create-invite">Create Invite Link</button>
    </div>
  );
}

export default Invites;
