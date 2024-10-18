import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function InviteBuffer({ token }) {
  const [text, setText] = useState("Loading invite...");
  const { serverId, inviteCode } = useParams();

  useEffect(() => {
    if (!token || !serverId || !inviteCode) return;
    fetch("/api/servers/join/" + serverId + "/" + inviteCode, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        window.location.href = "/servers/" + serverId;
      })
      .catch((err) => {
        if (err.status === 404) {
          setText(err.message);
        } else if (err.status === 400) {
          setText(err.message);
        } else if (err.status === 403) {
          setText("You are not logged in.");
        } else {
          console.log(err);
        }
        return;
      });
  }, [token, serverId, inviteCode]);

  return <div className="invite-buffer">{text}</div>;
}

export default InviteBuffer;
