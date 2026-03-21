import { IChatFromApi, IUserSearchResult } from "@shared/model";
import { IChat } from "../model/store";

export const resolveChatsWithUsernames = (
  chats: IChatFromApi[],
  users: IUserSearchResult[],
  currentUserId: number
): IChat[] => {
  const usersMap = new Map(users.map((u) => [u.id, u]));

  return chats.map((chat) => {
    const otherParticipantId = chat.participants.find((id) => id !== currentUserId);
    const otherUser = otherParticipantId != null ? usersMap.get(otherParticipantId) : undefined;
    return {
      id: chat.id,
      username: otherUser?.username ?? `Chat ${chat.id.slice(0, 8)}`,
      preview: "",
    };
  });
};
