import React, { FC } from "react";
import { Card, Flex } from "@radix-ui/themes";
import { useWsContext } from "@shared/lib";
import { Input } from "@shared/ui";

export const ChatList: FC = () => {
  const {} = useWsContext();
  return (
    <Card size="3">
      <Flex direction="column" gap="3">
        <Input placeholder="Поиск" />
      </Flex>
    </Card>
  );
};
