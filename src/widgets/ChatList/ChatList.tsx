import React, { FC } from "react";
import { Card, Flex, ScrollArea } from "@radix-ui/themes";
import { useWsContext } from "@shared/lib";
import { Input } from "@shared/ui";
import { ChatItem } from "./ChatItem";

export const ChatList: FC = () => {
  const {} = useWsContext();
  return (
    <Card size="3">
      <Flex direction="column" gap="3" height="100%">
        <Input placeholder="Поиск" />
        <ScrollArea
          type="hover"
          scrollbars="vertical"
          style={{ height: "auto" }}
        >
          <Flex direction="column" gap="3">
            <ChatItem username="Tony" preview="Hello how u doin?" />
            <ChatItem username="Lizzy" preview="Hello how u doin?" isTyping />
            <ChatItem username="Uno" preview="Hello how u doin?" />
          </Flex>
        </ScrollArea>
      </Flex>
    </Card>
  );
};
