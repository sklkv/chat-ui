import { FC, useState, useRef, PropsWithChildren } from "react";
import { websocket } from "@shared/api";
import { WsContext } from "@shared/lib";
import { Socket } from "socket.io-client";
import { IWsMessage, IWsReceivedMessage, WS_EVENTS } from "@shared/model";

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

  const handleSendMessage = (data: IWsMessage) => {
    ws.emit(WS_EVENTS.SEND_MESSAGE, data);
  };

  const handleRecieveMessages = (callback: (message: IWsReceivedMessage) => void) => {
    ws.on(WS_EVENTS.RECEIVE_MESSAGE, callback);
    return () => ws.off(WS_EVENTS.RECEIVE_MESSAGE, callback);
  };

  const handleJoinChat = (chatId: string) => {
    ws.emit(WS_EVENTS.JOIN_CHAT, { chat_id: chatId });
  };

  const handleLeaveChat = (chatId: string) => {
    ws.emit(WS_EVENTS.LEAVE_CHAT, { chat_id: chatId });
  };

  const handleEmitTyping = (chatId: string) => {
    ws.emit(WS_EVENTS.TYPING, { chat_id: chatId });
  };

  const handleEmitStopTyping = (chatId: string) => {
    ws.emit(WS_EVENTS.STOP_TYPING, { chat_id: chatId });
  };

  const handleReceiveTyping = (callback: (chatId: string) => void) => {
    const handler = ({ chat_id }: { chat_id: string }) => callback(chat_id);
    ws.on(WS_EVENTS.SERVER_TYPING, handler);
    return () => ws.off(WS_EVENTS.SERVER_TYPING, handler);
  };

  const handleReceiveStopTyping = (callback: (chatId: string) => void) => {
    const handler = ({ chat_id }: { chat_id: string }) => callback(chat_id);
    ws.on(WS_EVENTS.SERVER_STOP_TYPING, handler);
    return () => ws.off(WS_EVENTS.SERVER_STOP_TYPING, handler);
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
        handleJoinChat,
        handleLeaveChat,
      }}
    >
      {children}
    </WsContext.Provider>
  );
};
