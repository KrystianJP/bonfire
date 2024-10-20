import { createContext, useState, useEffect } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";

export const AgoraContext = createContext();

export const AgoraProvider = ({ children }) => {
  const [client, setClient] = useState(null);
  const [localAudioTrack, setLocalAudioTrack] = useState(null);
  const [isJoined, setIsJoined] = useState(false);
  const [currentChannel, setCurrentChannel] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isDeafened, setIsDeafened] = useState(false);

  const APP_ID = "0b3851e50b80459bb0dfd644e9410a90";

  useEffect(() => {
    const agoraClient = AgoraRTC.createClient({
      mode: "rtc",
      codec: "vp8",
    });

    setClient(agoraClient);

    // Listen for other users joining the channel
    agoraClient.on("user-published", async (user, mediaType) => {
      console.log(`User ${user.uid} published ${mediaType}`);
      await agoraClient.subscribe(user, mediaType);
      if (mediaType === "audio") {
        const audioTrack = user.audioTrack;
        audioTrack.play(); // Play the audio track
      }
    });

    agoraClient.on("user-unpublished", (user, mediaType) => {
      console.log(`User ${user.uid} unpublished ${mediaType}`);
      // Handle user audio unpublish if necessary
    });
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
      const token = await fetchToken(channelid, userId);
      const localTrack = await AgoraRTC.createMicrophoneAudioTrack();
      setLocalAudioTrack(localTrack);

      // Join the channel and publish the local audio track
      await client.join(APP_ID, channelid, token, userId);
      await client.publish([localTrack]);

      setCurrentChannel(channelid);
      console.log(`${userId} Joined voice channel: ${channelid}`);

      setIsJoined(true);
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

      setCurrentChannel(null);
    } catch (error) {
      console.error("Failed to leave the voice channel:", error);
    }
  };

  const toggleMute = async () => {
    if (isMuted) {
      await localAudioTrack.setVolume(100);
      setIsMuted(false);
    } else {
      await localAudioTrack.setVolume(0);
      setIsMuted(true);
    }
  };

  const toggleDeafen = async () => {
    if (isDeafened) {
      setIsDeafened(false);
      client.remoteUsers.forEach((user) => {
        if (user.audioTrack) {
          user.audioTrack.setVolume(100); // restore volume to normal
        }
      });
    } else {
      setIsDeafened(true);
      client.remoteUsers.forEach((user) => {
        if (user.audioTrack) {
          user.audioTrack.setVolume(0); // mute all
        }
      });
    }
  };

  return (
    <AgoraContext.Provider
      value={{
        joinVoiceChannel,
        leaveVoiceChannel,
        isJoined,
        currentChannel,
        isMuted,
        toggleMute,
        isDeafened,
        toggleDeafen,
      }}
    >
      {children}
    </AgoraContext.Provider>
  );
};

export default AgoraContext;
