import { FC } from "react";
import { Card, Flex, ScrollArea, Text, Spinner } from "@radix-ui/themes";
import { ChatSearch, useUserSearch } from "@features/chatSearch";
import { useChatStore, resolveChatsWithUsernames } from "@entities/chat";
import { useWsContext } from "@shared/lib";
import { ChatItem } from "@shared/ui";
import { api } from "@shared/api";
import { getLocalStorageItem } from "@shared/lib";
import { IUserSearchResult } from "@shared/model";


export const ChatList: FC = () => {
  const { handleJoinChat, handleLeaveChat } = useWsContext();
  const { getFilteredChats, selectChat, searchQuery, setSearchQuery, addChat, setChats } =
    useChatStore();
  const chats = getFilteredChats();
  const { results: userResults, isLoading: isSearching } = useUserSearch(searchQuery);

  const handleChatClick = (chatId: string) => {
    const previousSelected = useChatStore.getState().chats.find((c) => c.selected);
    if (previousSelected) {
      handleLeaveChat(previousSelected.id);
    }
    selectChat(chatId);
    handleJoinChat(chatId);
  };

  const handleUserClick = async (user: IUserSearchResult) => {
    try {
      const token = getLocalStorageItem("access_token") ?? "";
      const payload = JSON.parse(atob(token.split(".")[1]));
      const currentUserId: number = payload.sub;

      const newChat = await api.createChat([currentUserId, user.id]);

      addChat({ id: newChat.id, username: user.username, preview: "" });
      setSearchQuery("");
      selectChat(newChat.id);
      handleJoinChat(newChat.id);

      const [updatedChats, users] = await Promise.all([api.chats(), api.getUsers()]);
      setChats(resolveChatsWithUsernames(updatedChats, users, currentUserId));
    } catch (e) {
      console.error(e);
    }
  };

  const isSearchActive = searchQuery.trim().length > 0;

  return (
    <Card size="3">
      <Flex direction="column" gap="3" height="100%">
        <ChatSearch placeholder="Поиск пользователей" />
        <ScrollArea type="hover" scrollbars="vertical" style={{ height: "auto" }}>
          <Flex direction="column" gap="3">
            {isSearchActive ? (
              isSearching ? (
                <Flex justify="center" py="4">
                  <Spinner size="2" />
                </Flex>
              ) : userResults.length === 0 ? (
                <Text size="2" color="gray" align="center">
                  Пользователи не найдены
                </Text>
              ) : (
                userResults.map((user) => (
                  <ChatItem
                    key={user.id}
                    username={user.username}
                    preview={user.email}
                    onClick={() => handleUserClick(user)}
                  />
                ))
              )
            ) : (
              chats.map((chat) => (
                <ChatItem
                  key={chat.id}
                  username={chat.username}
                  preview={chat.preview}
                  isTyping={chat.isTyping}
                  selected={chat.selected}
                  onClick={() => handleChatClick(chat.id)}
                />
              ))
            )}
          </Flex>
        </ScrollArea>
      </Flex>
    </Card>
  );
};
