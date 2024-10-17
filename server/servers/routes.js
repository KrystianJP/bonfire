import { Router } from "express";
import controller from "./controller.js";
import authenticateToken from "../authenticateToken.js";

const router = Router();

router.get("/", authenticateToken, controller.getServers);
router.get("/:serverId", authenticateToken, controller.getServer);
router.get("/messages/:channelId", authenticateToken, controller.getMessages);
router.get("/find/:serverName", controller.findServer);

router.post("/", authenticateToken, controller.createServer);

router.post("/join/:serverId", authenticateToken, controller.joinServer);

router.post("/message/:channelId", authenticateToken, controller.sendMessage);

router.post("/roles/apply/:serverId", authenticateToken, controller.applyRoles);
router.post("/roles/add/:serverId", authenticateToken, controller.addRoles);
router.delete("/roles/:serverId", authenticateToken, controller.deleteRoles);

router.post(
  "/settings/channel_group/:serverId",
  authenticateToken,
  controller.addChannelGroup,
);
router.delete(
  "/settings/channel_groups",
  authenticateToken,
  controller.removeChannelGroups,
);

router.post(
  "/settings/:serverId",
  authenticateToken,
  controller.updateSettings,
);

export default router;
