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
        queries.createChannelGroup,
        ["general", results.rows[0].id, 0],
        (error, groups) => {
          if (error) throw error;
          pool.query(
            queries.createChannel,
            ["general", results.rows[0].id, false, groups.rows[0].id],
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
                      res.status(200).json({
                        serverid: results.rows[0].id,
                        default_channel: channels.rows[0].id,
                      });
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
    if (servers.rows.length === 0) {
      res.status(404).json({ message: "Server not found" });
    }
    pool.query(queries.getBans, [req.params.serverId], (error, bans) => {
      if (error) throw error;
      // check if user is banned
      if (bans.rows.some((ban) => ban.userid === req.user.id)) {
        res.status(403).json({ message: "You are banned from this server" });
      }
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
                let promiseArray = [];
                users.rows.forEach((user) => {
                  user.roles = [];
                });
                for (let i = 0; i < users.rows.length; i++) {
                  promiseArray.push(
                    new Promise((resolve, reject) => {
                      pool.query(
                        queries.getUserRoles,
                        [users.rows[i].id, servers.rows[0].id],
                        (error, results) => {
                          if (error) reject(error);
                          resolve([...results.rows, "online"]);
                        },
                      );
                    }),
                  );
                }

                Promise.all(promiseArray).then((values) => {
                  for (let i = 0; i < users.rows.length; i++) {
                    users.rows[i].roles = values[i];
                  }

                  pool.query(
                    queries.getChannelGroups,
                    [servers.rows[0].id],
                    (error, groups) => {
                      if (error) throw error;
                      res.status(200).json({
                        server: servers.rows[0],
                        users: users.rows,
                        channels: channels.rows,
                        roles: roles.rows,
                        channel_groups: groups.rows,
                        bans: bans.rows,
                      });
                    },
                  );
                });
              },
            );
          },
        );
      });
    });
  });
};

const getMessages = (req, res) => {
  pool.query(queries.getMessages, [req.params.channelId], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const sendMessage = (req, res) => {
  pool.query(
    queries.sendMessage,
    [req.user.id, req.params.channelId, req.body.message, Date.now()],
    (error, results) => {
      if (error) throw error;
      res.status(200).json({ message: results.rows[0] });
    },
  );
};

const findServer = (req, res) => {
  pool.query(queries.findServer, [req.params.serverName], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const updateSettings = (req, res) => {
  pool.query(
    queries.updateServer,
    [
      req.body.name,
      req.body.icon,
      req.body.default_channel,
      req.body.anyone_invite,
      req.params.serverId,
    ],
    (error, results) => {
      if (error) throw error;
      req.body.channels.forEach((channel) => {
        pool.query(
          queries.updateChannels,
          [channel.name, channel.id],
          (error, _) => {
            if (error) throw error;
          },
        );
      });
      req.body.roles.forEach((role) => {
        pool.query(queries.updateRoles, [role.name, role.id], (error, _) => {
          if (error) throw error;
        });
      });
      res.status(200).json({ message: "success" });
    },
  );
};

export default {
  getServers,
  createServer,
  joinServer,
  getServer,
  getMessages,
  sendMessage,
  findServer,
  updateSettings,
};
