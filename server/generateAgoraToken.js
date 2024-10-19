import pkg from "agora-access-token";
import {} from "dotenv/config.js";

const { RtcTokenBuilder, RtcRole } = pkg;

const APP_ID = process.env.APP_ID;
const APP_CERTIFICATE = process.env.APP_CERTIFICATE;

const generateAgoraToken = (req, res) => {
  const { channelId, uid } = req.query;

  if (!channelId || !uid) {
    return res.status(400).json({ error: "channelName and uid are required" });
  }

  const role = RtcRole.SUBSCRIBER;
  const expirationTimeInSeconds = 3600; // 1 hour token validity
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

  // Generate the RTC token
  const token = RtcTokenBuilder.buildTokenWithUid(
    APP_ID,
    APP_CERTIFICATE,
    channelId,
    uid,
    role,
    privilegeExpiredTs,
  );

  res.json({ token });
};

export default generateAgoraToken;
