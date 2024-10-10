const getUsers = "SELECT * FROM test;";
const insertUser =
  "INSERT INTO users (name, password) VALUES ($1, $2) RETURNING id;";

export default { getUsers, insertUser };
