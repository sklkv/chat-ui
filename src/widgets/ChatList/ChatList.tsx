import { FC } from "react";
import { Card, Flex, ScrollArea } from "@radix-ui/themes";
import { ChatSearch } from "@features/chatSearch";
import { useChatStore } from "@entities/chat";
import { useWsContext } from "@shared/lib";
import { ChatItem } from "@shared/ui";

export const ChatList: FC = () => {
  const { handleJoinChat, handleLeaveChat } = useWsContext();
  const { getFilteredChats, selectChat } = useChatStore();
  const chats = getFilteredChats();

  const handleChatClick = (chatId: string) => {
    const previousSelected = useChatStore.getState().chats.find((c) => c.selected);
    if (previousSelected) {
      handleLeaveChat(previousSelected.id);
    }
    selectChat(chatId);
    handleJoinChat(chatId);
  };

  return (
    <Card size="3">
      <Flex direction="column" gap="3" height="100%">
        <ChatSearch placeholder="Поиск" />
        <ScrollArea
          type="hover"
          scrollbars="vertical"
          style={{ height: "auto" }}
        >
          <Flex direction="column" gap="3">
            {chats.map((chat) => (
              <ChatItem
                key={chat.id}
                username={chat.username}
                preview={chat.preview}
                isTyping={chat.isTyping}
                selected={chat.selected}
                onClick={() => handleChatClick(chat.id)}
              />
            ))}
          </Flex>
        </ScrollArea>
      </Flex>
    </Card>
  );
};
