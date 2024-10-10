import { Router } from "express";
import controller from "./controller.js";
import authenticateToken from "../authenticateToken.js";

const router = Router();

router.post("/login", controller.loginUser);
router.post("/register", controller.registerUser);

router.delete("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
  });
});

router.get("/me", authenticateToken, (req, res) => {
  res.json(req.user);
});
router.get("/settings", authenticateToken, controller.getSettings);

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect("/login");
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    console.log("not authenticated");
    return res.redirect("/");
  }

  next();
}

export default router;
