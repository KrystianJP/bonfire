import {} from "dotenv/config.js";
import express from "express";
import userRoutes from "./users/routes.js";
import friendRoutes from "./friends/routes.js";
import serverRoutes from "./servers/routes.js";
import jwt from "jsonwebtoken";
import initializePassport from "./passport-config.js";
import passport from "passport";
import flash from "express-flash";
import session from "express-session";
import { Server } from "socket.io";
import pool from "./db.js";
import cors from "cors";
import generateAgoraToken from "./generateAgoraToken.js";

initializePassport(passport);

const app = express();
const PORT = process.env.PORT || 5000;
const corsOptions = {
  origin: "http://localhost:3000/", // Replace with your frontend URL
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Allows the server to accept cookies from the client
  optionsSuccessStatus: 204, // For legacy browser support
};

app.use(express.json());
app.use(flash());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/users", userRoutes);
app.use("/api/friends", friendRoutes);
app.use("/api/servers", serverRoutes);

app.get("/api/agora/token", generateAgoraToken);

const expressServer = app.listen(PORT, () =>
  console.log("Server started on port " + PORT),
);

const io = new Server(expressServer, {
  cors: { origin: "http://localhost:3000", methods: ["GET", "POST"] },
});

let users = {}; // user.id : socket.id
let voiceChannels = {}; // channel.id : [user.ids]

io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) {
    return next(new Error("Invalid token"));
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return next(new Error("Invalid token"));
    }
    socket.user = user;
    next();
  });
});

io.on("connection", (socket) => {
  users[socket.user.id] = socket.id;

  // make user online
  io.to("user" + socket.user.id).emit("connected_user", socket.user.id);
  pool.query(
    "UPDATE users SET online = true WHERE id = $1",
    [socket.user.id],
    (err) => {
      if (err) {
        console.log(err);
      }
    },
  );

  socket.on("join_voice_channel", (channelId) => {
    // if user is already in another channel, remove them
    for (const currentChannelId in voiceChannels) {
      const index = voiceChannels[currentChannelId]?.indexOf(socket.user.id);
      if (index > -1) {
        // user is currently in another channel, remove them
        voiceChannels[currentChannelId].splice(index, 1);
        console.log(`User ${socket.user.id} left channel ${currentChannelId}`);

        socket.to(currentChannelId).emit("user_left", socket.user.id);
      }
    }

    if (!voiceChannels[channelId]) {
      voiceChannels[channelId] = [];
    }

    voiceChannels[channelId].push(socket.user.id);

    io.to("user" + socket.user.id).emit("joined_voice_channel", {
      channelId,
      userid: socket.user.id,
    });
  });

  socket.on("leave_voice_channel", () => {
    const channelId = Object.keys(voiceChannels).find((key) =>
      voiceChannels[key].includes(socket.user.id),
    );
    if (voiceChannels[channelId]) {
      const index = voiceChannels[channelId].indexOf(socket.user.id);
      if (index > -1) {
        voiceChannels[channelId].splice(index, 1);

        io.to("user" + socket.user.id).emit("left_voice_channel", {
          channelId,
          userid: socket.user.id,
        });
      }
    }
  });

  socket.on("get_current_users", (channelId, callback) => {
    const currentUsers = voiceChannels[channelId] || [];

    callback(currentUsers);
  });

  socket.on("entered_page", (viewedUsers) => {
    viewedUsers.forEach((user) => {
      socket.join("user" + user.id);
    });

    // io.to(socket.id).emit("update_online_users", users);
  });

  socket.on("left_page", (viewedUsers) => {
    viewedUsers.forEach((user) => {
      socket.leave("user" + user.id);
    });
  });

  socket.on("join_room", (roomId) => {
    socket.join(roomId);
  });

  socket.on("send_message", (data) => {
    io.to(data.roomId).emit("receive_message", data);
    if (data.receiver) {
      io.to(users[data.receiver]).emit("unread", data);
    }
    console.log("message sent to " + data.roomId);
  });

  socket.on("leave_room", (roomId) => {
    socket.leave(roomId);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");

    socket
      .to("user" + socket.user.id)
      .emit("disconnected_user", socket.user.id);

    delete users[socket.user.id];

    // getting rid of user from voice channel
    for (const channelId in voiceChannels) {
      const index = voiceChannels[channelId].indexOf(socket.user.id);
      if (index > -1) {
        voiceChannels[channelId].splice(index, 1);
        io.to("user" + socket.user.id).emit("left_voice_channel", {
          channelId,
          userid: socket.user.id,
        });
        break;
      }
    }

    pool.query(
      "UPDATE users SET online = false WHERE id = $1",
      [socket.user.id],
      (err) => {
        if (err) {
          console.log(err);
        }
      },
    );
  });
});
