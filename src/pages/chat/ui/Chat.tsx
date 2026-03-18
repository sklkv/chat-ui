import { useEffect } from "react";
import { Flex } from "@radix-ui/themes";
import { ChatList } from "@widgets/ChatList";
import { CurrentChat } from "@widgets/CurrentChat";
import { useWsContext } from "@shared/lib";
import { IMessage } from "@shared/model";
import { useMessageStore } from "@entities/message";
import { useChatStore } from "@entities/chat";

export const Chat = () => {
  const { handleConnectWs, handleDisconnectWs, handleRecieveMessages } =
    useWsContext();
  const { addMessage } = useMessageStore();

  const handleUpdateMessages = (wsMessage: IMessage) => {
    const selectedChat = useChatStore
      .getState()
      .chats.find((c) => c.selected);
    if (!selectedChat) return;
    addMessage({
      id: crypto.randomUUID(),
      chatId: selectedChat.id,
      senderId: wsMessage.from,
      text: wsMessage.message,
      createdAt: new Date().toISOString(),
    });
  };

  useEffect(() => {
    handleConnectWs();
    handleRecieveMessages(handleUpdateMessages);
    return () => {
      handleDisconnectWs();
    };
  }, []);

  return (
    <Flex direction="row" width="900px" height="100%">
      <ChatList />
      <CurrentChat />
    </Flex>
  );
};
