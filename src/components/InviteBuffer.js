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
      .then((res) => {
        if (res.status === 404) {
          return res.json();
        }
        if (res.status === 400) {
          return res.json();
        }
        if (res.status === 403) {
          return res.json();
        }
        window.location.href = "/servers/" + serverId;
      })
      .then((data) => {
        if (data) {
          setText(data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token, serverId, inviteCode]);

  return <div className="invite-buffer">{text}</div>;
}

export default InviteBuffer;
