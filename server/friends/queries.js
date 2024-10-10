const getFriends =
  "SELECT name,pfp FROM users JOIN friendships ON users.id = friendships.user1id OR users.id = friendships.user2id WHERE (friendships.user1id = $1 OR friendships.user2id = $1) AND users.id != $1;";

const getFriendRequests =
  "SELECT name,pfp FROM users JOIN friend_requests ON users.id = friend_requests.sender WHERE friend_requests.receiver = $1;";

const insertFriendRequest =
  "INSERT INTO friend_requests (sender, receiver) VALUES ($1, $2);";

const insertFriendship =
  "INSERT INTO friendships (user1id, user2id) VALUES ($1, $2);";

export default {
  getFriends,
  insertFriendship,
  insertFriendRequest,
  getFriendRequests,
};
