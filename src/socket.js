import { io } from "socket.io-client";
import { SOCKET_URL } from "./api";

export const socket = io.connect(SOCKET_URL, {
  auth: { token: localStorage.getItem("token") },
});

// socket.on("receive_message", (data) => {
//   console.log("received message", data);
// });
