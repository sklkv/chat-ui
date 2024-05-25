import React from "react";
import { Card, Flex, ScrollArea } from "@radix-ui/themes";
import { MessageInput } from "@shared/ui";

export const CurrentChat = () => {
  return (
    <Flex style={{ flex: 1 }}>
      <Flex direction="column" gap="3" height="100%" width="100%">
        <Card>header</Card>
        <ScrollArea
          type="hover"
          scrollbars="vertical"
          style={{ height: "auto" }}
        >
          <Flex direction="column" gap="3">
            <div>message</div>
            <div>message</div>
            <div>message</div>
            <div>message</div>
            <div>message</div>
            <div>message</div>
            <div>message</div>
            <div>message</div>
            <div>message</div>
            <div>message</div>
            <div>message</div>
            <div>message</div>
          </Flex>
        </ScrollArea>
        <MessageInput />
      </Flex>
    </Flex>
  );
};
