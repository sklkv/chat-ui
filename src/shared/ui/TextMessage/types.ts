import { ITextMessage } from "react-chat-elements";

export interface ITextMessageProps {
  title: string;
  text: string;
  position: "right" | "left";
  date: Date;
}
