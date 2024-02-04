import { createContext, useContext } from "react";
import { Socket } from "socket.io-client";
import { IMessage } from "@shared/model";

/* eslint-disable */
export const WsContext = createContext<{
  isWsReady: boolean;
  ws?: Socket;
  handleConnectWs: VoidFunction;
  handleDisconnectWs: VoidFunction;
  handleSendMessage: (data: IMessage) => void;
  handleRecieveMessages: (callback: (message: IMessage) => void) => void;
}>({
  isWsReady: false,
  ws: undefined,
  handleConnectWs: () => {},
  handleDisconnectWs: () => {},
  handleSendMessage: () => {},
  handleRecieveMessages: () => {},
});

export const useWsContext = () => useContext(WsContext);
