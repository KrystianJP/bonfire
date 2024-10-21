import { Router } from "express";
import controller from "./controller.js";
import authenticateToken from "../authenticateToken.js";

const router = Router();

router.get("/", authenticateToken, controller.getServers);
router.get("/:serverId", authenticateToken, controller.getServer);
router.get(
  "/messages/:serverId/:channelId",
  authenticateToken,
  controller.getMessages,
);
router.get("/find/:serverName", controller.findServer);

router.post("/", authenticateToken, controller.createServer);

router.post(
  "/join/:serverId/:inviteCode",
  authenticateToken,
  controller.joinServer,
);

router.post("/message/:channelId", authenticateToken, controller.sendMessage);
router.delete(
  "/message/:serverId/:messageId",
  authenticateToken,
  controller.deleteMessage,
);

router.post("/roles/apply/:serverId", authenticateToken, controller.applyRoles);
router.post("/role/add/:serverId", authenticateToken, controller.addRole);
router.delete("/roles/:serverId", authenticateToken, controller.deleteRoles);

router.post(
  "/channel_group/:serverId",
  authenticateToken,
  controller.addChannelGroup,
);
router.delete(
  "/channel_groups/:serverId",
  authenticateToken,
  controller.removeChannelGroups,
);

router.post("/channel/add", authenticateToken, controller.addChannel);
router.delete(
  "/channels/:serverId",
  authenticateToken,
  controller.deleteChannels,
);

router.post(
  "/settings/:serverId",
  authenticateToken,
  controller.updateSettings,
);

router.get("/invite/:serverId", authenticateToken, controller.createInvite);

router.get("/channel/:channelId", authenticateToken, controller.getChannelById);

router.delete(
  "/kick/:serverId/:userId",
  authenticateToken,
  controller.kickUser,
);

router.delete("/ban/:serverId/:userId", authenticateToken, controller.banUser);
router.post("/unban/:serverId", authenticateToken, controller.unbanUsers);

router.get("/admin/:serverId", authenticateToken, controller.getAdmin);

export default router;
