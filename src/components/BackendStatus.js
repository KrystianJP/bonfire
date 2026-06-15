import { useEffect, useState } from "react";
import { API_BASE_URL } from "../api";

function BackendStatus() {
  const [backendStatus, setBackendStatus] = useState("checking");
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let readyTimeout;

    const checkBackend = async (signal) => {
      const controller = new AbortController();
      const timeout = window.setTimeout(() => controller.abort(), 10000);

      const abortRequest = () => controller.abort();
      signal?.addEventListener("abort", abortRequest);

      try {
        const response = await fetch(`${API_BASE_URL || ""}/health`, {
          signal: controller.signal,
        });

        return response.ok;
      } catch {
        return false;
      } finally {
        window.clearTimeout(timeout);
        signal?.removeEventListener("abort", abortRequest);
      }
    };

    const waitForBackend = async (signal) => {
      setBackendStatus("checking");

      for (let attempt = 0; attempt < 30; attempt += 1) {
        if (signal?.aborted) return;

        const ready = await checkBackend(signal);

        if (ready) {
          setBackendStatus("ready");
          readyTimeout = window.setTimeout(() => setVisible(false), 6000);
          return;
        }

        await new Promise((resolve) => window.setTimeout(resolve, 3000));
      }

      if (signal?.aborted) return;

      setBackendStatus("offline");
    };

    const controller = new AbortController();
    waitForBackend(controller.signal);

    return () => {
      controller.abort();
      window.clearTimeout(readyTimeout);
    };
  }, []);

  if (!visible) {
    return null;
  }

  const isReady = backendStatus === "ready";
  const isOffline = backendStatus === "offline";

  return (
    <div
      className={
        "backend-status " +
        (isReady ? "ready" : isOffline ? "offline" : "booting")
      }
    >
      <div className="backend-status-title">
        {isReady
          ? "Backend connected"
          : isOffline
            ? "Backend unavailable"
            : "Waking backend"}
      </div>
      <div className="backend-status-message">
        {isReady
          ? "Bonfire is connected and ready."
          : isOffline
            ? "The backend did not respond. Some features may not work yet."
            : "The server is starting up. This can take a moment on Render."}
      </div>
      {!isReady && !isOffline && <div className="backend-status-spinner" />}
    </div>
  );
}

export default BackendStatus;
