const getFriends =
  "SELECT id,name,pfp FROM users JOIN friendships ON users.id = friendships.user1id OR users.id = friendships.user2id WHERE (friendships.user1id = $1 OR friendships.user2id = $1) AND users.id != $1;";

const getFriendRequests =
  "SELECT id,name,pfp FROM users JOIN friend_requests ON users.id = friend_requests.sender WHERE friend_requests.receiver = $1;";

const deleteFriendRequest =
  "DELETE FROM friend_requests WHERE sender = $1 AND receiver = $2;";

const findRequest =
  "SELECT * FROM friend_requests WHERE sender = $1 AND receiver = $2;";

const insertFriendRequest =
  "INSERT INTO friend_requests (sender, receiver) VALUES ($1, $2);";

const insertFriendship =
  "INSERT INTO friendships (user1id, user2id) VALUES ($1, $2);";

export default {
  getFriends,
  insertFriendship,
  insertFriendRequest,
  getFriendRequests,
  findRequest,
  deleteFriendRequest,
};
