import React, { FC, useState, useEffect, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Flex } from "@radix-ui/themes";
import { ChatList } from "@widgets/ChatList";
import { CurrentChat } from "@widgets/CurrentChat";
import { useWsContext } from "@shared/lib";
import { IMessage } from "@shared/model";
// import { TextMessage, MessageInput } from "@shared/ui";
import { IChatProps } from "./types";

// import { userStateService } from "@entities/user";
// import { MOCK_MESSAGES } from "./mock";

// TODO: выпилить vkui
export const Chat: FC<IChatProps> = () => {
  const navigate = useNavigate();
  const {
    isWsReady,
    handleConnectWs,
    handleDisconnectWs,
    handleSendMessage,
    handleRecieveMessages,
  } = useWsContext();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [message, setMessage] = useState<string>("");
  const onMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleUpdateMessages = (message: IMessage) => {
    setMessages((prevState) => [...prevState, message]);
  };

  const sendMessage = () => {
    handleSendMessage({
      from: "nickname",
      message,
    });
    setMessage("");
  };

  useEffect(() => {
    // navigate(APP_ROUTES.SIGNIN);
    handleConnectWs();
    // handleRecieveMessages(handleUpdateMessages);
    return () => {
      handleDisconnectWs();
    };
  }, []);

  return (
    <Flex direction="row" width="900px" height="max-content">
      <ChatList />
      <CurrentChat />
    </Flex>
  );
};
