import { FC, ChangeEvent } from "react";
import { Input } from "@shared/ui";
import { useChatStore } from "@entities/chat/model/store";

export interface IChatSearchProps {
  placeholder?: string;
}

export const ChatSearch: FC<IChatSearchProps> = ({ placeholder = "Поиск" }) => {
  const { setSearchQuery } = useChatStore();

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return <Input placeholder={placeholder} onChange={handleSearchChange} />;
};
