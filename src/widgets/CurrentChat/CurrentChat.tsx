import { useState } from "react";
import { Card, Flex, ScrollArea, Text } from "@radix-ui/themes";
import { MessageInput, TextMessage } from "@shared/ui";
import { useWsContext } from "@shared/lib";
import { useChatStore } from "@entities/chat";
import { useMessageStore } from "@entities/message";
import { userStateService } from "@entities/user";

export const CurrentChat = () => {
  const [text, setText] = useState("");
  const { handleSendMessage } = useWsContext();

  const selectedChat = useChatStore((state) =>
    state.chats.find((c) => c.selected)
  );
  const messages = useMessageStore((state) =>
    selectedChat ? (state.messages[selectedChat.id] ?? []) : []
  );
  const { addMessage } = useMessageStore();

  const currentUsername = userStateService.getState()?.username;

  const handleSend = () => {
    if (!text.trim() || !selectedChat) return;
    const from = currentUsername ?? "me";
    handleSendMessage({ from, message: text });
    addMessage({
      id: crypto.randomUUID(),
      chatId: selectedChat.id,
      senderId: from,
      text,
      createdAt: new Date().toISOString(),
    });
    setText("");
  };

  return (
    <Flex style={{ flex: 1 }}>
      <Flex direction="column" gap="4" height="100%" width="100%">
        <Card>
          <Text size="4" color="bronze">
            {selectedChat?.username ?? "Select a chat"}
          </Text>
        </Card>
        <ScrollArea
          type="hover"
          scrollbars="vertical"
          style={{ height: "100%" }}
        >
          <Flex direction="column" gap="3">
            {messages.map((msg) => (
              <TextMessage
                key={msg.id}
                title={msg.senderId}
                text={msg.text}
                position={msg.senderId === currentUsername ? "right" : "left"}
                date={new Date(msg.createdAt)}
              />
            ))}
          </Flex>
        </ScrollArea>
        <MessageInput
          value={text}
          onChange={setText}
          onSend={handleSend}
          disabled={!selectedChat}
          placeholder="Type a message..."
        />
      </Flex>
    </Flex>
  );
};
