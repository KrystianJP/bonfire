const getUsers = "SELECT * FROM test;";
const getUserByName = "SELECT name, id FROM users WHERE name = $1;";
const getUserById = "SELECT id, name, pfp FROM users WHERE id = $1;";
const getSettings =
  "SELECT name, pfp, about, banner, message_privacy, friend_privacy, theme, role_colours FROM users INNER JOIN user_settings ON users.id = user_settings.userid WHERE userid = $1;";

const insertUser =
  "INSERT INTO users (name, password) VALUES ($1, $2) RETURNING id; ";
const insertSettings =
  "INSERT INTO user_settings (userid, message_privacy, friend_privacy, theme, role_colours) VALUES ($1, '{false, false, false}', '{false, false, false}', 'dark', true);";

const updateUser =
  "UPDATE users SET name = $2, pfp = $3, about = $4, banner = $5 WHERE id = $1; ";
const updateSettings =
  "UPDATE user_settings SET message_privacy = $2, friend_privacy = $3, theme = $4, role_colours = $5 WHERE userid = $1;";

const deleteUser = "DELETE FROM users WHERE id = $1;";

export default {
  getUsers,
  insertUser,
  getSettings,
  insertSettings,
  getUserByName,
  getUserById,
  updateUser,
  updateSettings,
  deleteUser,
};
