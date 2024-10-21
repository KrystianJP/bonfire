function Bans({ bans, setBans, setState, deletedBans }) {
  const defaultPfp =
    "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg";
  function unban(user) {
    deletedBans.current.push(user);
    setState(
      setBans,
      bans.filter((ban) => ban.id !== user.id),
    );
  }

  return (
    <div className="bans-page settings-content">
      <h1>Bans</h1>
      <div className="setting-container">
        <div className="setting-label">BANS</div>
        <div className="role-list">
          {bans.map((ban) => (
            <div className="role-container" key={ban.id}>
              <div className="role">
                <div className="ban-pfp">
                  <img
                    className="pfp-img"
                    src={ban.pfp ? ban.pfp : defaultPfp}
                    alt="banned user"
                  />
                </div>
                {ban.name}
                <span
                  className="material-icons unban-icon"
                  onClick={() => unban(ban)}
                >
                  close
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Bans;
