import {} from "dotenv/config.js";
import express from "express";
import userRoutes from "./users/routes.js";
import friendRoutes from "./friends/routes.js";
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

const expressServer = app.listen(PORT, () =>
  console.log("Server started on port " + PORT),
);

const io = new Server(expressServer, {
  cors: { origin: "http://localhost:3000", methods: ["GET", "POST"] },
});

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("join_room", (roomId) => {
    socket.join(roomId);
    console.log("User joined room " + roomId);
  });

  socket.on("send_message", (data) => {
    io.to(data.roomId).emit("receive_message", data);
    console.log("message sent to " + data.roomId);
    console.log(socket.rooms);
  });

  socket.on("leave_room", (roomId) => {
    socket.leave(roomId);
    console.log("User left room " + roomId);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});
