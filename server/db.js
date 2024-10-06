import pg from "pg";
const { Pool } = pg;

// PUT PASSWORD IN ENV
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "bonfire",
  password: "test",
  port: 5432,
});

export default pool;
