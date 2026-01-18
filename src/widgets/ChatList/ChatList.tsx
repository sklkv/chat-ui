import { FC } from "react";
import { Card, Flex, ScrollArea } from "@radix-ui/themes";
import { ChatSearch } from "@features/chatSearch";
import { useChatStore } from "@entities/chat";
import { useWsContext } from "@shared/lib";
import { ChatItem } from "@shared/ui";

export const ChatList: FC = () => {
  const {} = useWsContext();
  const { getFilteredChats } = useChatStore();
  const chats = getFilteredChats();

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
              />
            ))}
          </Flex>
        </ScrollArea>
      </Flex>
    </Card>
  );
};
