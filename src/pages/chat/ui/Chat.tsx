import { useCallback, useEffect } from "react";
import { Flex } from "@radix-ui/themes";
import { ChatList } from "@widgets/ChatList";
import { CurrentChat } from "@widgets/CurrentChat";
import { useMessageStore } from "@entities/message";
import { useChatStore, resolveChatsWithUsernames } from "@entities/chat";
import { api } from "@shared/api";
import { useWsContext, getLocalStorageItem } from "@shared/lib";
import { IWsReceivedMessage } from "@shared/model";

export const Chat = () => {
  const {
    handleConnectWs,
    handleDisconnectWs,
    handleRecieveMessages,
    handleReceiveTyping,
    handleReceiveStopTyping,
  } = useWsContext();
  const { addMessage } = useMessageStore();
  const { setTyping, setChats } = useChatStore();

  const handleUpdateMessages = useCallback(
    (wsMessage: IWsReceivedMessage) => {
      addMessage({
        id: wsMessage.id,
        chatId: wsMessage.chat_id,
        senderId: String(wsMessage.user_id),
        text: wsMessage.text,
        createdAt: new Date().toISOString(),
      });
    },
    [addMessage]
  );

  useEffect(() => {
    const token = getLocalStorageItem("access_token") ?? "";
    const currentUserId: number = JSON.parse(atob(token.split(".")[1])).sub;

    Promise.all([api.chats(), api.getUsers()]).then(([chats, users]) => {
      setChats(resolveChatsWithUsernames(chats, users, currentUserId));
    });

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
