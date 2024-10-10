import {} from "dotenv/config.js";
import express from "express";
import userRoutes from "./users/routes.js";
import jwt from "jsonwebtoken";
import initializePassport from "./passport-config.js";
import passport from "passport";
import flash from "express-flash";
import session from "express-session";

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

app.get("/api/friends", (req, res) => {
  res.json({
    friends: [
      {
        username: "PickleJuice",
        pfp: "https://imgcdn.stablediffusionweb.com/2024/4/16/7263bda6-c6d4-46f5-90d7-9a659e42bce1.jpg",
      },
      {
        username: "SomebodyElse",
        pfp: "https://pics.craiyon.com/2023-10-25/37325fe41b05409d89f905897c6e0da3.webp",
      },
      {
        username: "KrysJP",
        pfp: "https://i.pinimg.com/originals/d5/7c/eb/d57ceb9546385b8d5c224c34502ddcf6.jpg",
      },
    ],
  });
});

app.listen(PORT, () => console.log("Server started on port " + PORT));
