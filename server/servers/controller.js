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
        queries.createChannel,
        ["general", results.rows[0].id, false, "general"],
        (error, channels) => {
          if (error) throw error;
          pool.query(
            queries.setDefaultChannel,
            [channels.rows[0].id, results.rows[0].id],
            (error, _) => {
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

// need to check for existing servership before allowing
const getServer = (req, res) => {
  pool.query(queries.getServer, [req.params.serverId], (error, servers) => {
    if (error) throw error;
    pool.query(queries.getUsers, [req.params.serverId], (error, users) => {
      if (error) throw error;
      pool.query(
        queries.getChannels,
        [req.params.serverId],
        (error, channels) => {
          if (error) throw error;
          pool.query(
            queries.getRoles,
            [req.params.serverId],
            (error, roles) => {
              if (error) throw error;
              users.rows.forEach((user) => {
                user.roles = [];
              });
              for (let i = 0; i < users.rows.length; i++) {
                pool.query(
                  queries.getUserRoles,
                  [users.rows[i].id, servers.rows[0].id],
                  (error, results) => {
                    if (error) throw error;
                    users.rows[i].roles = results.rows;
                  },
                );
              }
              res.status(200).json({
                server: servers.rows[0],
                users: users.rows,
                channels: channels.rows,
                roles: roles.rows,
              });
            },
          );
        },
      );
    });
  });
};

export default { getServers, createServer, joinServer, getServer };
