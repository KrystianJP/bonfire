import pool from "../db.js";
import queries from "./queries.js";
import {} from "dotenv/config.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import passport from "passport";

const loginUser = (req, res, next) => {
  passport.authenticate("local", function (err, user) {
    if (err) {
      return next(err); // will generate a 500 error
    }
    // Generate a JSON response reflecting authentication status
    if (!user) {
      return res.json({
        message: "Invalid credentials",
      });
    }
    req.login(user, function (err) {
      if (err) {
        return next(err);
      }
      const accessToken = jwt.sign(
        JSON.parse(JSON.stringify(user)),
        process.env.ACCESS_TOKEN_SECRET,
      );
      return res.json({
        accessToken,
      });
    });
  })(req, res, next);
};

const registerUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    // checking if username already exists
    // inserting user
    pool.query(
      queries.insertUser,
      [req.body.username, hashedPassword],
      (error, results) => {
        if (error) throw error;
        // inserting the user's settings (separate because can't have multiple queries with parameters for some reason)
        pool.query(queries.insertSettings, [results.rows[0].id], (error, _) => {
          if (error) throw error;
          const accessToken = jwt.sign(
            { name: req.body.username, id: results.rows[0].id },
            process.env.ACCESS_TOKEN_SECRET,
          );

          return res.json({
            accessToken,
          });
        });
      },
    );
  } catch {
    res.redirect("/register");
  }
};

const getMe = (req, res) => {
  pool.query(queries.getUserById, [req.user.id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows[0]);
  });
};

const getSettings = (req, res) => {
  pool.query(queries.getSettings, [req.user.id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows[0]);
  });
};

const updateUser = (req, res) => {
  pool.query(
    queries.updateUser,
    [req.user.id, req.body.name, req.body.pfp, req.body.about, req.body.banner],
    (error, _) => {
      if (error) throw error;
      pool.query(
        queries.updateSettings,
        [
          req.user.id,
          req.body.message_privacy,
          req.body.friend_privacy,
          req.body.theme,
          req.body.role_colours,
        ],
        (error, _) => {
          if (error) throw error;
          res.status(200).json({ message: "success" });
        },
      );
    },
  );
};

const getUserByName = (req, res) => {
  pool.query(queries.getUserByName, [req.params.username], (error, results) => {
    if (error) throw error;
    res.status(200).send(results.rows);
  });
};

export default {
  loginUser,
  registerUser,
  getSettings,
  getMe,
  getUserByName,
  updateUser,
};
