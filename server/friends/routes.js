import { Router } from "express";
import controller from "./controller.js";
import authenticateToken from "../authenticateToken.js";

const router = Router();

router.get("/", authenticateToken, controller.getFriends);
router.get("/requests", authenticateToken, controller.getFriendRequests);

router.post("/:friendName", authenticateToken, controller.addFriendRequest);

export default router;
