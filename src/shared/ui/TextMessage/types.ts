import { ITextMessage } from "react-chat-elements";

export interface ITextMessageProps
  extends Omit<
    ITextMessage,
    | "type"
    | "retracted"
    | "notch"
    | "removeButton"
    | "replyButton"
    | "forwarded"
    | "focus"
  > {}
