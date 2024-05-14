import React from "react";
import { Card, Flex } from "@radix-ui/themes";

export const CurrentChat = () => {
  return (
    <Flex style={{ flex: 1 }} justify="center">
      <Card size="3">
        <Flex direction="column" gap="3">
          <div>Current Chat</div>
        </Flex>
      </Card>
    </Flex>
  );
};
