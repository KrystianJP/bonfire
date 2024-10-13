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

initializePassport(passport);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(flash());
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

const expressServer = app.listen(PORT, () =>
  console.log("Server started on port " + PORT),
);

const io = new Server(expressServer, {
  cors: { origin: "http://localhost:3000", methods: ["GET", "POST"] },
});

let users = {};

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

  socket.on("join_room", (roomId) => {
    socket.join(roomId);
  });

  socket.on("send_message", (data) => {
    io.to(data.roomId).emit("receive_message", data);
    io.to(users[data.receiver]).emit("unread", data);
    console.log("message sent to " + data.roomId);
  });

  socket.on("leave_room", (roomId) => {
    socket.leave(roomId);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
    delete users[socket.user.id];
  });
});
