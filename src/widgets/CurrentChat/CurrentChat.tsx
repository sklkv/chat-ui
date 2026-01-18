import { Card, Flex, ScrollArea, Text } from "@radix-ui/themes";
import { MessageInput, TextMessage } from "@shared/ui";

// TODO: make features
export const CurrentChat = () => {
  return (
    <Flex style={{ flex: 1 }}>
      <Flex direction="column" gap="4" height="100%" width="100%">
        <Card>
          <Text size="4" color="bronze">
            #Username#
          </Text>
        </Card>
        <ScrollArea
          type="hover"
          scrollbars="vertical"
          style={{ height: "100%" }}
        >
          <Flex direction="column" gap="3">
            <TextMessage
              title="Tony"
              text="How u doin?"
              position="right"
              date={new Date()}
            />
            <TextMessage
              title="Lizzy"
              text="How u doin?"
              position="left"
              date={new Date()}
            />
          </Flex>
        </ScrollArea>
        <MessageInput />
      </Flex>
    </Flex>
  );
};
