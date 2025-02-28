const getServers =
  "SELECT * FROM servers JOIN serverships ON servers.id = serverships.serverid WHERE serverships.userid = $1;";
const createServer =
  "INSERT INTO servers (name, icon, owner, anyone_invite) VALUES ($1, $2, $3, false) RETURNING *;";
const joinServer =
  "INSERT INTO serverships (serverid, userid) VALUES ($1, $2);";
const findServership =
  "SELECT * FROM serverships WHERE serverid = $1 AND userid = $2;";

const getServer = "SELECT * FROM servers WHERE id = $1;";
const getUsers =
  "SELECT users.id,name,pfp,about,banner, online FROM users JOIN serverships ON users.id = serverships.userid WHERE serverships.serverid = $1;";
const getChannels =
  "SELECT * FROM channels WHERE serverid = $1 ORDER BY channelnr;";
const getRoles = "SELECT * FROM roles WHERE serverid = $1 ORDER BY rolenr;";
const getChannelGroups =
  "SELECT * FROM channel_groups WHERE serverid = $1 ORDER BY groupnr;";

const createChannel =
  "INSERT INTO channels (name, serverid, voice, channel_group) VALUES ($1, $2, $3, $4) RETURNING id;";
const setDefaultChannel =
  "UPDATE servers SET default_channel = $1 WHERE id = $2;";
const createChannelGroup =
  "INSERT INTO channel_groups (name, serverid, groupnr) VALUES ($1, $2, $3) RETURNING id;";

const getUserRoles =
  "SELECT roles.* FROM user_roles JOIN roles ON user_roles.roleid = roles.id JOIN servers ON roles.serverid = servers.id WHERE roles.serverid = $2 AND user_roles.userid = $1;";

const getMessages =
  "SELECT id,msg_text, authorid, msg_timestamp FROM channel_messages WHERE channelid=$1 ORDER BY msg_timestamp DESC;";
const sendMessage =
  "INSERT INTO channel_messages (authorid, channelid, msg_text, msg_timestamp) VALUES ($1, $2, $3, to_timestamp($4 / 1000.0)) RETURNING *;";

const getBans =
  "SELECT bans.userid, users.* FROM bans JOIN users ON bans.userid = users.id WHERE bans.serverid = $1;";

const findServer = "SELECT name FROM servers WHERE name = $1;";

const updateServer =
  "UPDATE servers SET name = $1, icon = $2, default_channel= $3, anyone_invite = $4 WHERE id = $5;";
const updateChannels =
  "UPDATE channels SET name = $1, channelnr = $2 WHERE id = $3;";
const updateRoles =
  "UPDATE roles SET name = $1, colour = $2, rolenr = $3, server_admin = $4 WHERE id = $5;";
const updateChannelGroup =
  "UPDATE channel_groups SET name = $1, groupnr = $2 WHERE id = $3;";

const deleteChannel = "DELETE FROM channels WHERE id = $1;";
const deleteGroup = "DELETE FROM channel_groups WHERE id = $1;";
const deleteBan = "DELETE FROM bans WHERE id = $1;";
const deleteRole = "DELETE FROM roles WHERE id = $1;";
const deleteServer = "DELETE FROM servers WHERE id = $1;";

const addRole =
  "INSERT INTO roles (name, colour, rolenr, serverid) VALUES ($1, $2, $3, $4) RETURNING *;";

const giveUserRole =
  "INSERT INTO user_roles (userid, roleid) VALUES ($1, $2) ON CONFLICT DO NOTHING;";
const removeUserRole =
  "DELETE FROM user_roles WHERE userid = $1 AND roleid = $2;";

const addChannelGroup =
  "INSERT INTO channel_groups (name, serverid, groupnr) VALUES ($1, $2, $3) RETURNING *;";
const removeChannelGroup = "DELETE FROM channel_groups WHERE id = $1";

const addChannel =
  "INSERT INTO channels (name, voice, serverid, channel_group, channelnr) VALUES ($1, $2, $3, $4, $5) RETURNING *;";

const newInvite =
  "INSERT INTO invites (serverid, invite_code, expiry) VALUES ($1, $2, $3) RETURNING *;";
const findInvite = "SELECT * FROM invites WHERE invite_code = $1;";
const checkForInvite =
  "SELECT * FROM invites WHERE serverid = $1 AND invite_code = $2;";

const getChannelById = "SELECT * FROM channels WHERE id = $1;";

const kickUser = "DELETE FROM serverships WHERE serverid = $1 AND userid = $2;";

const deleteMessage = "DELETE FROM channel_messages WHERE id = $1;";

const banUser =
  "INSERT INTO bans (serverid, userid) VALUES ($1, $2) RETURNING *;";
const unbanUser = "DELETE FROM bans WHERE serverid = $1 AND userid = $2;";

const getOwner = "SELECT owner FROM servers WHERE id = $1;";

const leaveServer =
  "DELETE FROM serverships WHERE serverid = $1 AND userid = $2;";

const updateOwner = "UPDATE servers SET owner = $1 WHERE id = $2;";

export default {
  getServers,
  createServer,
  joinServer,
  findServership,
  getServer,
  getUsers,
  getChannels,
  getRoles,
  createChannel,
  setDefaultChannel,
  getUserRoles,
  getChannelGroups,
  createChannelGroup,
  getMessages,
  sendMessage,
  getBans,
  findServer,
  updateServer,
  updateChannels,
  updateRoles,
  updateChannelGroup,
  deleteChannel,
  deleteGroup,
  deleteBan,
  deleteRole,
  deleteServer,
  addRole,
  giveUserRole,
  removeUserRole,
  addChannelGroup,
  removeChannelGroup,
  addChannel,
  newInvite,
  findInvite,
  checkForInvite,
  getChannelById,
  kickUser,
  deleteMessage,
  banUser,
  unbanUser,
  getOwner,
  leaveServer,
  updateOwner,
};
