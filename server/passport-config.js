import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import pool from "./db.js";

function initialize(passport) {
  const authenticateUser = (username, password, done) => {
    pool.query(
      "SELECT * FROM users WHERE name = $1",
      [username],
      (err, results) => {
        if (err) throw err;

        if (results.rows.length > 0) {
          const user = results.rows[0];

          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, { message: "Password incorrect" });
            }
          });
        } else {
          return done(null, false, { message: "Username not found" });
        }
      },
    );
  };

  passport.use(
    new LocalStrategy({ usernameField: "username" }, authenticateUser),
  );
  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser((id, done) => {
    pool.query("SELECT * FROM users WHERE id = $1", [id], (err, results) => {
      if (err) throw err;
      return done(null, results.rows[0]);
    });
  });
}

export default initialize;
