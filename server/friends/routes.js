import { Router } from "express";
import controller from "./controller.js";
import authenticateToken from "../authenticateToken.js";

const router = Router();

router.get("/", authenticateToken, controller.getFriends);
router.get("/requests", authenticateToken, controller.getFriendRequests);
router.get("/messages/:friendId", authenticateToken, controller.getMessages);

router.post("/unread/:friendId", authenticateToken, controller.updateUnread);
router.post("/:friendName", authenticateToken, controller.addFriendRequest);
router.post(
  "/accept/:friendId",
  authenticateToken,
  controller.acceptFriendRequest,
);
router.post("/message/:friendId", authenticateToken, controller.sendMessage);

router.delete(
  "/decline/:friendId",
  authenticateToken,
  controller.declineFriendRequest,
);

export default router;
