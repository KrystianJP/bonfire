import { Router } from "express";
import controller from "./controller.js";
import authenticateToken from "../authenticateToken.js";

const router = Router();

router.get("/", authenticateToken, controller.getServers);
router.get("/:serverId", authenticateToken, controller.getServer);
router.get("/messages/:channelId", authenticateToken, controller.getMessages);
router.get("/find/:serverName", controller.findServer);

router.post("/", authenticateToken, controller.createServer);

router.post(
  "/join/:serverId/:inviteCode",
  authenticateToken,
  controller.joinServer,
);

router.post("/message/:channelId", authenticateToken, controller.sendMessage);

router.post("/roles/apply/:serverId", authenticateToken, controller.applyRoles);
router.post("/role/add/:serverId", authenticateToken, controller.addRole);
router.delete("/roles/:serverId", authenticateToken, controller.deleteRoles);

router.post(
  "/channel_group/:serverId",
  authenticateToken,
  controller.addChannelGroup,
);
router.delete(
  "/channel_groups",
  authenticateToken,
  controller.removeChannelGroups,
);

router.post("/channel/add", authenticateToken, controller.addChannel);
router.delete("/channels", authenticateToken, controller.deleteChannels);

router.post(
  "/settings/:serverId",
  authenticateToken,
  controller.updateSettings,
);

router.get("/invite/:serverId", authenticateToken, controller.createInvite);

router.get("/channel/:channelId", authenticateToken, controller.getChannelById);

export default router;
