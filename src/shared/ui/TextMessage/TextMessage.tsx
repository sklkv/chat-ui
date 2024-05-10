import React, { FC } from "react";
import { MessageBox } from "react-chat-elements";
import { ITextMessageProps } from "./types";

export const TextMessage: FC<ITextMessageProps> = (props) => (
  <MessageBox
    type="text"
    retracted={false}
    notch={true}
    removeButton={false}
    replyButton={false}
    forwarded={false}
    focus={false}
    {...props}
  />
);
