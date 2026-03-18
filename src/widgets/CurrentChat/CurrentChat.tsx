import { useState, useEffect, useRef } from "react";
import { Card, Flex, ScrollArea, Text } from "@radix-ui/themes";
import { MessageInput, TextMessage } from "@shared/ui";
import { useWsContext } from "@shared/lib";
import { useChatStore } from "@entities/chat";
import { useMessageStore } from "@entities/message";
import { userStateService } from "@entities/user";

export const CurrentChat = () => {
  const [text, setText] = useState("");
  const { handleSendMessage, handleEmitTyping, handleEmitStopTyping } =
    useWsContext();
  const bottomRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const selectedChat = useChatStore((state) =>
    state.chats.find((c) => c.selected)
  );
  const messages = useMessageStore((state) =>
    selectedChat ? (state.messages[selectedChat.id] ?? []) : []
  );
  const { addMessage } = useMessageStore();

  const currentUsername = userStateService.getState()?.username;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleTextChange = (value: string) => {
    setText(value);
    if (!selectedChat) return;
    if (value.trim()) {
      handleEmitTyping(selectedChat.id);
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = setTimeout(() => {
        handleEmitStopTyping(selectedChat.id);
      }, 2000);
    } else {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      handleEmitStopTyping(selectedChat.id);
    }
  };

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
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    handleEmitStopTyping(selectedChat.id);
    setText("");
  };

  if (!selectedChat) {
    return (
      <Flex style={{ flex: 1 }} align="center" justify="center">
        <Text size="3" color="gray">
          Select a chat to start messaging
        </Text>
      </Flex>
    );
  }

  return (
    <Flex style={{ flex: 1 }}>
      <Flex direction="column" gap="4" height="100%" width="100%">
        <Card>
          <Text size="4" color="bronze">
            {selectedChat.username}
          </Text>
        </Card>
        <ScrollArea
          type="hover"
          scrollbars="vertical"
          style={{ height: "100%" }}
        >
          <Flex direction="column" gap="3">
            {messages.length === 0 ? (
              <Flex align="center" justify="center" py="9">
                <Text size="2" color="gray">
                  No messages yet
                </Text>
              </Flex>
            ) : (
              messages.map((msg) => (
                <TextMessage
                  key={msg.id}
                  title={msg.senderId}
                  text={msg.text}
                  position={
                    msg.senderId === currentUsername ? "right" : "left"
                  }
                  date={new Date(msg.createdAt)}
                />
              ))
            )}
            <div ref={bottomRef} />
          </Flex>
        </ScrollArea>
        <MessageInput
          value={text}
          onChange={handleTextChange}
          onSend={handleSend}
          placeholder="Type a message..."
        />
      </Flex>
    </Flex>
  );
};
