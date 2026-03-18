import { useCallback, useEffect } from "react";
import { Flex } from "@radix-ui/themes";
import { ChatList } from "@widgets/ChatList";
import { CurrentChat } from "@widgets/CurrentChat";
import { useWsContext } from "@shared/lib";
import { IWsMessage } from "@shared/model";
import { useMessageStore } from "@entities/message";
import { useChatStore } from "@entities/chat";

export const Chat = () => {
  const {
    handleConnectWs,
    handleDisconnectWs,
    handleRecieveMessages,
    handleReceiveTyping,
    handleReceiveStopTyping,
  } = useWsContext();
  const { addMessage } = useMessageStore();
  const { setTyping } = useChatStore();

  const handleUpdateMessages = useCallback(
    (wsMessage: IWsMessage) => {
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
    },
    [addMessage]
  );

  useEffect(() => {
    handleConnectWs();
    const offReceive = handleRecieveMessages(handleUpdateMessages);
    const offTyping = handleReceiveTyping((chatId) => setTyping(chatId, true));
    const offStopTyping = handleReceiveStopTyping((chatId) =>
      setTyping(chatId, false)
    );
    return () => {
      offReceive();
      offTyping();
      offStopTyping();
      handleDisconnectWs();
    };
  }, [handleUpdateMessages]);

  return (
    <Flex direction="row" width="900px" height="100%">
      <ChatList />
      <CurrentChat />
    </Flex>
  );
};
