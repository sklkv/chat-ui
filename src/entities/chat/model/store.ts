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
  setChats: (chats: IChat[]) => void;
  addChat: (chat: IChat) => void;
  setSearchQuery: (query: string) => void;
  selectChat: (id: string) => void;
  setTyping: (chatId: string, isTyping: boolean) => void;
  getFilteredChats: () => IChat[];
}

export const useChatStore = create<ChatState>((set, get) => ({
  chats: [],
  searchQuery: "",

  setChats: (chats) => set({ chats }),

  addChat: (chat) =>
    set((state) => ({
      chats: state.chats.some((c) => c.id === chat.id)
        ? state.chats
        : [...state.chats, chat],
    })),

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
