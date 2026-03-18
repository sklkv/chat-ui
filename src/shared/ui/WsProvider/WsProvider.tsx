import { FC, useState, useRef, PropsWithChildren } from "react";
import { websocket } from "@shared/api";
import { WsContext } from "@shared/lib";
import { Socket } from "socket.io-client";
import { IWsMessage, WS_EVENTS } from "@shared/model";

export const WsProvider: FC<PropsWithChildren> = ({ children }) => {
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

  const handleSendMessage = ({ from, message }: IWsMessage) => {
    ws.emit("user-dispatch-message", {
      from,
      message,
    });
  };

  const handleRecieveMessages = (callback: (message: IWsMessage) => void) => {
    ws.on("server-dispatch-message", callback);
    return () => ws.off("server-dispatch-message", callback);
  };

  const handleEmitTyping = (chatId: string) => {
    ws.emit(WS_EVENTS.TYPING, { chatId });
  };

  const handleEmitStopTyping = (chatId: string) => {
    ws.emit(WS_EVENTS.STOP_TYPING, { chatId });
  };

  const handleReceiveTyping = (callback: (chatId: string) => void) => {
    const handler = ({ chatId }: { chatId: string }) => callback(chatId);
    ws.on(WS_EVENTS.TYPING, handler);
    return () => ws.off(WS_EVENTS.TYPING, handler);
  };

  const handleReceiveStopTyping = (callback: (chatId: string) => void) => {
    const handler = ({ chatId }: { chatId: string }) => callback(chatId);
    ws.on(WS_EVENTS.STOP_TYPING, handler);
    return () => ws.off(WS_EVENTS.STOP_TYPING, handler);
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
        handleEmitTyping,
        handleEmitStopTyping,
        handleReceiveTyping,
        handleReceiveStopTyping,
      }}
    >
      {children}
    </WsContext.Provider>
  );
};
