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
    pool.query(queries.getUnread, [req.user.id], (error, unread) => {
      if (error) throw error;
      res.status(200).json({ friends: results.rows, unread: unread.rows });
    });
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

const acceptFriendRequest = (req, res) => {
  pool.query(
    queries.findRequest,
    [req.params.friendId, req.user.id],
    (error, results) => {
      if (error) throw error;
      if (results.rows.length === 0) {
        res.status(404).json({ message: "Request not found" });
        return;
      }
      pool.query(
        queries.insertFriendship,
        [
          Math.min(results.rows[0].sender, results.rows[0].receiver),
          Math.max(results.rows[0].sender, results.rows[0].receiver),
        ],
        (error, _) => {
          if (error) throw error;
          pool.query(
            queries.deleteFriendRequest,
            [results.rows[0].sender, results.rows[0].receiver],
            (error, _) => {
              if (error) throw error;
              pool.query(
                queries.insertUnread,
                [req.user.id, req.params.friendId],
                (error, _) => {
                  if (error) throw error;
                  pool.query(
                    queries.insertUnread,
                    [req.params.friendId, req.user.id],
                    (error, _) => {
                      if (error) throw error;
                      res.status(200).json({ message: "success" });
                    },
                  );
                },
              );
            },
          );
        },
      );
    },
  );
};

const declineFriendRequest = (req, res) => {
  pool.query(
    queries.deleteFriendRequest,
    [req.params.friendId, req.user.id],
    (error, _) => {
      if (error) throw error;
      res.status(200).json({ message: "success" });
    },
  );
};

const getMessages = (req, res) => {
  pool.query(
    queries.getMessages,
    [req.user.id, req.params.friendId],
    (error, results) => {
      if (error) throw error;
      pool.query(
        queries.updateUnread,
        [false, req.params.friendId, req.user.id],
        (error, _) => {
          if (error) throw error;
          res.status(200).json(results.rows);
        },
      );
    },
  );
};

const sendMessage = (req, res) => {
  pool.query(
    queries.sendMessage,
    [req.user.id, req.params.friendId, req.body.message, Date.now()],
    (error, results) => {
      if (error) throw error;
      pool.query(
        queries.updateLastMessage,
        [
          Date.now(),
          Math.min(req.user.id, req.params.friendId),
          Math.max(req.user.id, req.params.friendId),
        ],
        (error, _) => {
          if (error) throw error;
          pool.query(
            queries.updateUnread,
            [true, req.user.id, req.params.friendId],
            (error, _) => {
              if (error) throw error;
              res.status(200).json({ message: results.rows[0] });
            },
          );
        },
      );
    },
  );
};

const updateUnread = (req, res) => {
  pool.query(
    queries.updateUnread,
    [req.body.unread, req.user.id, req.params.friendId],
    (error, _) => {
      if (error) throw error;
      res.status(200).json({ message: "success" });
    },
  );
};

export default {
  getFriends,
  addFriendRequest,
  getFriendRequests,
  acceptFriendRequest,
  declineFriendRequest,
  getMessages,
  sendMessage,
  updateUnread,
};
