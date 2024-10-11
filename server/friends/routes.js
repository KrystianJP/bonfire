import { Router } from "express";
import controller from "./controller.js";
import authenticateToken from "../authenticateToken.js";

const router = Router();

router.get("/", authenticateToken, controller.getFriends);
router.get("/requests", authenticateToken, controller.getFriendRequests);

router.post("/:friendName", authenticateToken, controller.addFriendRequest);
router.post(
  "/accept/:friendId",
  authenticateToken,
  controller.acceptFriendRequest,
);

router.delete(
  "/decline/:friendId",
  authenticateToken,
  controller.declineFriendRequest,
);

export default router;
