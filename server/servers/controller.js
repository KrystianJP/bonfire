import pool from "../db.js";
import queries from "./queries.js";
import {} from "dotenv/config.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import passport from "passport";
import userQueries from "../users/queries.js";

const getServers = (req, res) => {
  pool.query(queries.getServers, [req.user.id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const createServer = (req, res) => {
  pool.query(
    queries.createServer,
    [req.body.name, req.body.icon, req.user.id],
    (error, results) => {
      if (error) throw error;
      pool.query(
        queries.joinServer,
        [results.rows[0].id, req.user.id],
        (error, _) => {
          if (error) throw error;
          res.status(200).json(results.rows[0]);
        },
      );
    },
  );
};

// need to add check for server request before joining
const joinServer = (req, res) => {
  pool.query(
    queries.joinServer,
    [req.body.serverId, req.user.id],
    (error, results) => {
      if (error) throw error;
      res.status(200).json({ message: "success" });
    },
  );
};

export default { getServers, createServer, joinServer };
