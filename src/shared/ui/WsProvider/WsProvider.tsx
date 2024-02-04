import React, { FC, useState, useRef } from "react";
import { websocket } from "@shared/api";
import { WsContext } from "@shared/lib";
import { Socket } from "socket.io-client";
import { IMessage } from "@shared/model";

export const WsProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
	const [isWsReady, setIsWsReady] = useState<boolean>(false);
	const { current: ws } = useRef<Socket>(websocket);

	const handleConnectWs = () => {
		ws.connect();
		ws.on("connect", () => {
			setIsWsReady(true);
			ws.emit("new-connection", `user ${ws.id} has been connected`);
		});
	};

	const handleDisconnectWs = () => {
		ws.disconnect();
		setIsWsReady(false);
	};

	const handleSendMessage = ({ from, message }: IMessage) => {
		ws.emit("user-dispatch-message", {
			from,
			message,
		});
	};

	const handleRecieveMessages = (callback: (message: IMessage) => void) => {
		ws.on("server-dispatch-message", callback);
	};

	return (
		<WsContext.Provider
			value={{
				isWsReady,
				ws: ws,
				handleConnectWs,
				handleDisconnectWs,
				handleSendMessage,
				handleRecieveMessages,
			}}
		>
			{children}
		</WsContext.Provider>
	);
};
