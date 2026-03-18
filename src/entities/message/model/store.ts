import { create } from "zustand";

export interface IMessage {
  id: string;
  chatId: string;
  senderId: string;
  text: string;
  createdAt: string;
}

interface MessageState {
  messages: Record<string, IMessage[]>;
  addMessage: (msg: IMessage) => void;
  setMessages: (chatId: string, msgs: IMessage[]) => void;
  clearMessages: () => void;
}

export const useMessageStore = create<MessageState>((set) => ({
  messages: {},

  addMessage: (msg) =>
    set((state) => ({
      messages: {
        ...state.messages,
        [msg.chatId]: [...(state.messages[msg.chatId] ?? []), msg],
      },
    })),

  setMessages: (chatId, msgs) =>
    set((state) => ({
      messages: {
        ...state.messages,
        [chatId]: msgs,
      },
    })),

  clearMessages: () => set({ messages: {} }),
}));
