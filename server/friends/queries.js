const getFriends =
  "SELECT * FROM users JOIN friendships ON users.id = friendships.user1id OR users.id = friendships.user2id WHERE (friendships.user1id = $1 OR friendships.user2id = $1) AND users.id != $1 ORDER BY last_msg_timestamp DESC NULLS LAST;";

const getFriendRequests =
  "SELECT id,name,pfp FROM users JOIN friend_requests ON users.id = friend_requests.sender WHERE friend_requests.receiver = $1;";

const getMessages =
  "SELECT id,msg_text, authorid, msg_timestamp FROM direct_messages WHERE (authorid = $1 AND receiverid = $2) OR (authorid = $2 AND receiverid = $1) ORDER BY msg_timestamp DESC;";

const updateUnread =
  "UPDATE dms_unread SET unread=$1 WHERE sender = $2 AND receiver = $3;";

const getUnread =
  "SELECT sender FROM dms_unread WHERE receiver = $1 AND unread = true;";

const insertUnread =
  "INSERT INTO dms_unread (sender, receiver, unread) VALUES ($1, $2, false);";

const deleteFriendRequest =
  "DELETE FROM friend_requests WHERE sender = $1 AND receiver = $2 OR sender = $2 AND receiver = $1;";

const findRequest =
  "SELECT * FROM friend_requests WHERE sender = $1 AND receiver = $2;";

const insertFriendRequest =
  "INSERT INTO friend_requests (sender, receiver) VALUES ($1, $2);";

const insertFriendship =
  "INSERT INTO friendships (user1id, user2id) VALUES ($1, $2);";

const sendMessage =
  "INSERT INTO direct_messages (authorid, receiverid, msg_text, msg_timestamp) VALUES ($1, $2, $3, to_timestamp($4 / 1000.0)) RETURNING *;";

const updateLastMessage =
  "UPDATE friendships SET last_msg_timestamp = to_timestamp($1 / 1000.0) WHERE user1id = $2 AND user2id = $3;";

const isFriend =
  "SELECT * FROM friendships WHERE user1id = $1 AND user2id = $2;";

const removeFriend =
  "DELETE FROM friendships WHERE user1id = $1 AND user2id = $2;";

const deleteMessage = "DELETE FROM direct_messages WHERE id = $1;";

export default {
  getFriends,
  insertFriendship,
  insertFriendRequest,
  getFriendRequests,
  findRequest,
  deleteFriendRequest,
  getMessages,
  sendMessage,
  updateLastMessage,
  updateUnread,
  getUnread,
  insertUnread,
  isFriend,
  removeFriend,
  deleteMessage,
};
