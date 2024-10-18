import { useState } from "react";

function Invites({ info, setAnyoneInvite, setState, token, serverId }) {
  const [buttonText, setButtonText] = useState("Create Invite Link");

  function createInvite() {
    fetch("/api/servers/invite/" + serverId, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        navigator.clipboard.writeText(
          window.location.origin +
            "/invite/" +
            serverId +
            "/" +
            data.inviteCode,
        );
        setButtonText("Copied!");
      })
      .catch((err) => console.log(err));
  }

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
      <button className="create-invite" onClick={createInvite}>
        {buttonText}
      </button>
    </div>
  );
}

export default Invites;
