import { io } from "socket.io-client";

export const websocket = io("localhost:3000", {
	transports: ["websocket"],
	reconnectionAttempts: 3,
	reconnectionDelay: 3000,
	autoConnect: false,
});
