import React, { FC } from "react";
import { Card, Flex } from "@radix-ui/themes";
import { useWsContext } from "@shared/lib";
import { Input } from "@shared/ui";
import { ChatItem } from "./ChatItem";

export const ChatList: FC = () => {
  const {} = useWsContext();
  return (
    <Card size="3">
      <Flex direction="column" gap="3">
        <Input placeholder="Поиск" />
        <ChatItem username="Tony" preview="Hello how u doin?" />
        <ChatItem username="Lizy" preview="Hello how u doin?" isTyping />
        <ChatItem username="Uno" preview="Hello how u doin?" />
      </Flex>
    </Card>
  );
};
