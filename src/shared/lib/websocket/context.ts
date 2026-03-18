import { createContext, useContext } from "react";
import { Socket } from "socket.io-client";
import { IWsMessage } from "@shared/model";

/* eslint-disable */
export const WsContext = createContext<{
  isWsReady: boolean;
  ws?: Socket;
  handleConnectWs: VoidFunction;
  handleDisconnectWs: VoidFunction;
  handleSendMessage: (data: IWsMessage) => void;
  handleRecieveMessages: (callback: (message: IWsMessage) => void) => VoidFunction;
  handleEmitTyping: (chatId: string) => void;
  handleEmitStopTyping: (chatId: string) => void;
  handleReceiveTyping: (callback: (chatId: string) => void) => VoidFunction;
  handleReceiveStopTyping: (callback: (chatId: string) => void) => VoidFunction;
}>({
  isWsReady: false,
  ws: undefined,
  handleConnectWs: () => {},
  handleDisconnectWs: () => {},
  handleSendMessage: () => {},
  handleRecieveMessages: () => () => {},
  handleEmitTyping: () => {},
  handleEmitStopTyping: () => {},
  handleReceiveTyping: () => () => {},
  handleReceiveStopTyping: () => () => {},
});

export const useWsContext = () => useContext(WsContext);
