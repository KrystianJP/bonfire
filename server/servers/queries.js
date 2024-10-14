const getServers =
  "SELECT * FROM servers JOIN serverships ON servers.id = serverships.serverid WHERE serverships.userid = $1;";
const createServer =
  "INSERT INTO servers (name, icon, owner, anyone_invite) VALUES ($1, $2, $3, false) RETURNING *;";
const joinServer =
  "INSERT INTO serverships (serverid, userid) VALUES ($1, $2);";

const getServer = "SELECT * FROM servers WHERE id = $1;";
const getUsers =
  "SELECT users.id,name,pfp FROM users JOIN serverships ON users.id = serverships.userid WHERE serverships.serverid = $1;";
const getChannels = "SELECT * FROM channels WHERE serverid = $1;";
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
  "SELECT * FROM user_roles JOIN roles ON user_roles.roleid = roles.id JOIN servers ON roles.serverid = servers.id WHERE roles.serverid = $2 AND user_roles.userid = $1;";

export default {
  getServers,
  createServer,
  joinServer,
  getServer,
  getUsers,
  getChannels,
  getRoles,
  createChannel,
  setDefaultChannel,
  getUserRoles,
  getChannelGroups,
  createChannelGroup,
};
