const productionApiUrl = "https://bonfire-q85p.onrender.com";

const configuredApiUrl = process.env.REACT_APP_API_URL || productionApiUrl;

const isLocalhost =
  typeof window !== "undefined" &&
  ["localhost", "127.0.0.1"].includes(window.location.hostname);

export const API_BASE_URL = isLocalhost
  ? process.env.REACT_APP_API_URL || ""
  : configuredApiUrl;

export const SOCKET_URL = isLocalhost
  ? process.env.REACT_APP_API_URL || "http://localhost:5000"
  : configuredApiUrl;

const originalFetch = window.fetch.bind(window);

window.fetch = (input, init) => {
  if (typeof input !== "string" || !API_BASE_URL) {
    return originalFetch(input, init);
  }

  const isApiRequest = input.startsWith("/api/") || input.startsWith("api/");

  if (!isApiRequest) {
    return originalFetch(input, init);
  }

  const path = input.startsWith("/") ? input : `/${input}`;
  return originalFetch(`${API_BASE_URL}${path}`, init);
};
