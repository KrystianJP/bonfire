import { Router } from "express";
import controller from "./controller.js";
import authenticateToken from "../authenticateToken.js";

const router = Router();

router.get("/", authenticateToken, controller.getServers);
router.get("/:serverId", authenticateToken, controller.getServer);
router.get("/messages/:channelId", authenticateToken, controller.getMessages);

router.post("/", authenticateToken, controller.createServer);

router.post("/join/:serverId", authenticateToken, controller.joinServer);

router.post("/message/:channelId", authenticateToken, controller.sendMessage);

export default router;
