import { useState, useEffect, useRef, useCallback, useLayoutEffect } from "react";
import { Card, Flex, Text, Spinner } from "@radix-ui/themes";
import { MessageInput, TextMessage } from "@shared/ui";
import { useWsContext, getLocalStorageItem } from "@shared/lib";
import { useChatStore } from "@entities/chat";
import { useMessageStore, IMessage } from "@entities/message";
import { userStateService } from "@entities/user";
import { api } from "@shared/api";

const PAGE_SIZE = 50;
const EMPTY_MESSAGES: IMessage[] = [];

const mapApiMessage = (msg: {
  id: string;
  chat_id: string;
  user_id: number;
  text: string;
  createdAt: string;
}): IMessage => ({
  id: msg.id,
  chatId: msg.chat_id,
  senderId: String(msg.user_id),
  text: msg.text,
  createdAt: msg.createdAt,
});

export const CurrentChat = () => {
  const [text, setText] = useState("");
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const { handleSendMessage, handleEmitTyping, handleEmitStopTyping } = useWsContext();

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const topSentinelRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const prevScrollHeightRef = useRef<number>(0);
  const hasMoreRef = useRef<boolean>(true);
  const isLoadingMoreRef = useRef<boolean>(false);
  const isNearBottomRef = useRef<boolean>(true);
  const loadedCountRef = useRef<number>(0);
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const selectedChat = useChatStore((state) => state.chats.find((c) => c.selected));
  const selectedChatId = selectedChat?.id;
  const messages = useMessageStore((state) =>
    selectedChatId ? (state.messages[selectedChatId] ?? EMPTY_MESSAGES) : EMPTY_MESSAGES
  );

  const currentUser = userStateService.getState();
  const currentUsername = currentUser?.username;
  const token = getLocalStorageItem("access_token") ?? "";
  const currentUserId: number = JSON.parse(atob(token.split(".")[1])).sub;

  // Fetch a page of messages; from=0 is the initial load, from>0 is a scroll-up load.
  const loadMessages = useCallback(async (chatId: string, from: number) => {
    if (isLoadingMoreRef.current) return;

    isLoadingMoreRef.current = true;
    setIsLoadingMore(true);

    const container = scrollContainerRef.current;
    if (from > 0 && container) {
      prevScrollHeightRef.current = container.scrollHeight;
    }

    try {
      const fetched = await api.getMessages(chatId, from, from + PAGE_SIZE);

      // Guard: chat may have changed while awaiting
      const stillSelected =
        useChatStore.getState().chats.find((c) => c.selected)?.id === chatId;
      if (!stillSelected) return;

      if (fetched.length < PAGE_SIZE) {
        hasMoreRef.current = false;
      }

      const mapped = [...fetched].reverse().map(mapApiMessage);

      if (from === 0) {
        useMessageStore.getState().setMessages(chatId, mapped);
      } else if (mapped.length > 0) {
        useMessageStore.getState().prependMessages(chatId, mapped);
      } else {
        prevScrollHeightRef.current = 0;
      }

      loadedCountRef.current = from + fetched.length;
    } catch {
      prevScrollHeightRef.current = 0;
    } finally {
      isLoadingMoreRef.current = false;
      setIsLoadingMore(false);
    }
  }, []);

  // Reset everything and load first page when chat changes.
  useEffect(() => {
    if (!selectedChatId) return;

    hasMoreRef.current = true;
    loadedCountRef.current = 0;
    isLoadingMoreRef.current = false;
    isNearBottomRef.current = true;
    prevScrollHeightRef.current = 0;
    setIsLoadingMore(false);

    loadMessages(selectedChatId, 0);
  }, [selectedChatId, loadMessages]);

  // After messages update: restore scroll position (older messages prepended)
  // or scroll to bottom (new WS message arrived).
  useLayoutEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    if (prevScrollHeightRef.current > 0) {
      container.scrollTop += container.scrollHeight - prevScrollHeightRef.current;
      prevScrollHeightRef.current = 0;
    } else if (isNearBottomRef.current) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]);

  // Track whether user is near the bottom so new messages auto-scroll.
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      isNearBottomRef.current = scrollHeight - scrollTop - clientHeight < 150;
    };

    container.addEventListener("scroll", onScroll, { passive: true });
    return () => container.removeEventListener("scroll", onScroll);
  }, [selectedChatId]);

  // IntersectionObserver on top sentinel to trigger loading older messages.
  useEffect(() => {
    const sentinel = topSentinelRef.current;
    const container = scrollContainerRef.current;
    if (!sentinel || !container || !selectedChatId) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMoreRef.current) {
          loadMessages(selectedChatId, loadedCountRef.current);
        }
      },
      { root: container, threshold: 0 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [selectedChatId, loadMessages]);

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
    handleSendMessage({
      chat_id: selectedChat.id,
      user_id: currentUserId,
      type: "text",
      text,
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

        <div
          ref={scrollContainerRef}
          style={{ flex: 1, overflowY: "auto", minHeight: 0 }}
        >
          {/* Top sentinel — when visible, older messages are loaded */}
          <div ref={topSentinelRef} />

          {isLoadingMore && (
            <Flex justify="center" py="2">
              <Spinner size="2" />
            </Flex>
          )}

          <Flex direction="column" gap="3" p="2">
            {messages.length === 0 && !isLoadingMore ? (
              <Flex align="center" justify="center" py="9">
                <Text size="2" color="gray">
                  No messages yet
                </Text>
              </Flex>
            ) : (
              messages.map((msg) => (
                <TextMessage
                  key={msg.id}
                  title={msg.senderId === String(currentUserId) ? (currentUsername ?? msg.senderId) : selectedChat.username}
                  text={msg.text}
                  position={msg.senderId === String(currentUserId) ? "right" : "left"}
                  date={new Date(msg.createdAt)}
                />
              ))
            )}
            <div ref={bottomRef} />
          </Flex>
        </div>

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
