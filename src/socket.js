import { io } from "socket.io-client";

export const socket = io.connect("http://localhost:5000", {
  auth: { token: localStorage.getItem("token") },
});

// socket.on("receive_message", (data) => {
//   console.log("received message", data);
// });
