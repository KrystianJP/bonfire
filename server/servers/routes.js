import { Router } from "express";
import controller from "./controller.js";
import authenticateToken from "../authenticateToken.js";

const router = Router();

router.get("/", authenticateToken, controller.getServers);

router.post("/", authenticateToken, controller.createServer);

router.post("/join/:serverId", authenticateToken, controller.joinServer);

export default router;
