import { io } from "socket.io-client";

export const websocket = io("localhost:3001", {
  transports: ["websocket"],
  reconnectionAttempts: 3,
  reconnectionDelay: 3000,
  autoConnect: false,
});
