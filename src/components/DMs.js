import { Link, useParams } from "react-router-dom";
import DMProfileBar from "./DMProfileBar";
import Messages from "./Messages";
import { useEffect, useState } from "react";
function DMs() {
  let { username } = useParams();
  const [profileBarOpen, setProfileBarOpen] = useState(false);

  function widthListener() {
    if (window.innerWidth > 1000) {
      setProfileBarOpen(true);
    } else {
      setProfileBarOpen(false);
    }
  }

  useEffect(() => {
    window.addEventListener("resize", widthListener);
    return () => {
      window.removeEventListener("resize", widthListener);
    };
  }, []);

  // THIS WILL FIND THE FRIENDS INFO BASED ON USERNAME
  // AND ONLY STORE THEIR INFO, THIS IS FOR DEMONSTRATION
  const friendInfo = {
    PickleJuice: {
      pfp: "https://imgcdn.stablediffusionweb.com/2024/4/16/7263bda6-c6d4-46f5-90d7-9a659e42bce1.jpg",
      about: "me like pickles wowowowowoowowowow whoopee",
    },
    SomebodyElse: {
      pfp: "https://pics.craiyon.com/2023-10-25/37325fe41b05409d89f905897c6e0da3.webp",
      about: "somebody that you used to know SOMEBODYYY",
    },
    KrysJP: {
      pfp: "https://i.pinimg.com/originals/d5/7c/eb/d57ceb9546385b8d5c224c34502ddcf6.jpg",
      about: "me like krys",
    },
  };

  return (
    <div className="dms">
      <div className="top-bar top-dm-bar">
        <div
          className="top-bar-left"
          onClick={() => setProfileBarOpen(!profileBarOpen)}
        >
          <div className="profile-pfp friend-dm-pfp">
            <img
              src={friendInfo[username].pfp}
              alt="friend profile picture"
              className="pfp-img"
            />
          </div>
          <span className="friend-name friend-name-dm">{username}</span>
        </div>
        <div className="top-bar-right">
          <span className="material-icons">call</span>
          <span className="material-icons">videocam</span>
          <span className="material-icons">notifications</span>
          <span className="material-icons ">delete</span>
          <span className="material-icons ">block</span>
        </div>
      </div>
      <Messages friendInfo={friendInfo} />
      <DMProfileBar
        friend={friendInfo[username]}
        displayStyle={profileBarOpen ? "block" : "none"}
      />
    </div>
  );
}

export default DMs;
