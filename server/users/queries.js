const getUsers = "SELECT * FROM test;";
const insertUser =
  "INSERT INTO users (name, password) VALUES ($1, $2) RETURNING id; ";
const insertSettings =
  "INSERT INTO user_settings (userid, message_privacy, friend_privacy, theme, role_colours) VALUES ($1, '{false, false, false}', '{false, false, false}', 'dark', true);";
const getSettings =
  "SELECT name, pfp, about, banner, message_privacy, friend_privacy, theme, role_colours FROM users INNER JOIN user_settings ON users.id = user_settings.userid WHERE userid = $1;";

export default { getUsers, insertUser, getSettings, insertSettings };
