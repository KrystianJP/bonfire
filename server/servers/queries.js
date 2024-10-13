const getServers =
  "SELECT * FROM servers JOIN serverships ON servers.id = serverships.serverid WHERE serverships.userid = $1;";
const createServer =
  "INSERT INTO servers (name, icon, owner) VALUES ($1, $2, $3) RETURNING id;";
const joinServer =
  "INSERT INTO serverships (serverid, userid) VALUES ($1, $2);";

export default { getServers, createServer, joinServer };
