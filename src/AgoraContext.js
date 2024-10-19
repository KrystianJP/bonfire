import { createContext, useState, useEffect } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";

export const AgoraContext = createContext();

export const AgoraProvider = ({ children }) => {
  const [client, setClient] = useState(null);
  const [localAudioTrack, setLocalAudioTrack] = useState(null);
  const [isJoined, setIsJoined] = useState(false);

  const APP_ID = "0b3851e50b80459bb0dfd644e9410a90";

  useEffect(() => {
    const agoraClient = AgoraRTC.createClient({
      mode: "rtc",
      codec: "vp8",
    });

    setClient(agoraClient);
  }, []);

  const fetchToken = async (channelid, uid) => {
    const response = await fetch(
      `/api/agora/token?channelId=${channelid}&uid=${uid}`,
    );
    const data = await response.json();
    return data.token;
  };

  const joinVoiceChannel = async (channelid, userId) => {
    if (!client) return;

    try {
      // Fetch token from server
      const token = await fetchToken(channelid, userId);

      // Create the local audio track
      const localTrack = await AgoraRTC.createMicrophoneAudioTrack();
      setLocalAudioTrack(localTrack);

      // Join the channel using token and publish the audio
      await client.join(APP_ID, channelid, token, userId);
      await client.publish([localTrack]);

      setIsJoined(true);
      console.log("Joined voice channel:", channelid);
    } catch (error) {
      console.error("Failed to join the voice channel:", error);
    }
  };

  const leaveVoiceChannel = async () => {
    if (!client || !localAudioTrack) return;

    try {
      await client.unpublish([localAudioTrack]);
      await client.leave();
      localAudioTrack.close();

      setLocalAudioTrack(null);
      setIsJoined(false);
      console.log("Left the voice channel");
    } catch (error) {
      console.error("Failed to leave the voice channel:", error);
    }
  };

  return (
    <AgoraContext.Provider
      value={{ joinVoiceChannel, leaveVoiceChannel, isJoined }}
    >
      {children}
    </AgoraContext.Provider>
  );
};

export default AgoraContext;
