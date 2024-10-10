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

app.listen(PORT, () => console.log("Server started on port " + PORT));
