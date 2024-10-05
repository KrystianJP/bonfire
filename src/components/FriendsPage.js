import FriendsBar from "./FriendsBar";
import ProfileBar from "./ProfileBar";
import FriendsList from "./FriendsList";
import DMs from "./DMs";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function FriendsPage({ page }) {
  const { username } = useParams();
  const [friends, setFriends] = useState([]);
  // let friends = [
  //   {
  //     username: "PickleJuice",
  //     pfp: "https://imgcdn.stablediffusionweb.com/2024/4/16/7263bda6-c6d4-46f5-90d7-9a659e42bce1.jpg",
  //   },
  //   {
  //     username: "SomebodyElse",
  //     pfp: "https://pics.craiyon.com/2023-10-25/37325fe41b05409d89f905897c6e0da3.webp",
  //   },
  //   {
  //     username: "KrysJP",
  //     pfp: "https://i.pinimg.com/originals/d5/7c/eb/d57ceb9546385b8d5c224c34502ddcf6.jpg",
  //   },
  // ];

  useEffect(() => {
    fetch("/api/friends")
      .then((res) => res.json())
      .then((data) => setFriends(data.friends));
  });

  return (
    <div className="friends-page">
      <FriendsBar
        friends={friends}
        currentFriend={page === "dms" ? username : ""}
      />
      <ProfileBar />
      {page === "friends-list" && <FriendsList friends={friends} />}
      {page === "dms" && <DMs />}
    </div>
  );
}

export default FriendsPage;
