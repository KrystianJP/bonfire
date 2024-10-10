import pool from "../db.js";
import queries from "./queries.js";
import {} from "dotenv/config.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import passport from "passport";
import userQueries from "../users/queries.js";

const getFriends = (req, res) => {
  pool.query(queries.getFriends, [req.user.id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const getFriendRequests = (req, res) => {
  pool.query(queries.getFriendRequests, [req.user.id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const addFriendRequest = (req, res) => {
  pool.query(
    userQueries.getUserByName,
    [req.params.friendName],
    (error, results) => {
      if (error) throw error;
      if (results.rows.length === 0) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      pool.query(
        queries.insertFriendRequest,
        [req.user.id, results.rows[0].id],
        (error, _) => {
          if (error) throw error;
          res.status(200).json({ message: "success" });
        },
      );
    },
  );
};

export default { getFriends, addFriendRequest, getFriendRequests };
