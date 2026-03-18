import { create } from "zustand";

export interface IChat {
  id: string;
  username: string;
  preview: string;
  isTyping?: boolean;
  selected?: boolean;
}

interface ChatState {
  chats: IChat[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectChat: (id: string) => void;
  setTyping: (chatId: string, isTyping: boolean) => void;
  getFilteredChats: () => IChat[];
}

export const useChatStore = create<ChatState>((set, get) => ({
  chats: [
    { id: "1", username: "Tony", preview: "Hello how u doin?" },
    {
      id: "2",
      username: "Lizzy",
      preview: "Hello how u doin?",
      isTyping: true,
    },
    { id: "3", username: "Uno", preview: "Hello how u doin?" },
    { id: "4", username: "Alex", preview: "Meeting at 3pm" },
    { id: "5", username: "Sarah", preview: "Did you see the news?" },
    { id: "6", username: "Mike", preview: "Thanks for your help!" },
  ],
  searchQuery: "",

  setSearchQuery: (query) => set({ searchQuery: query }),

  selectChat: (id) =>
    set((state) => ({
      chats: state.chats.map((chat) => ({
        ...chat,
        selected: chat.id === id,
      })),
    })),

  setTyping: (chatId, isTyping) =>
    set((state) => ({
      chats: state.chats.map((chat) =>
        chat.id === chatId ? { ...chat, isTyping } : chat
      ),
    })),

  getFilteredChats: () => {
    const { chats, searchQuery } = get();
    if (!searchQuery) return chats;

    return chats.filter(
      (chat) =>
        chat.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chat.preview.toLowerCase().includes(searchQuery.toLowerCase())
    );
  },
}));
