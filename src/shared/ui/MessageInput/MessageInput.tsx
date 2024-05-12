import React, { FC } from "react";
import { Flex, TextArea } from "@radix-ui/themes";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { Button } from "../Button";
import { IMessageInputProps } from "./types";

import styles from "./MessageInput.modules.css";

export const MessageInput: FC<IMessageInputProps> = ({
  width = "100%",
  size,
  onChange,
  value,
  onSend,
  ...props
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <Flex direction="row" justify="between" width={width}>
      <TextArea
        className={styles["message-input_textarea"]}
        onChange={handleChange}
        value={value}
        size={size}
        {...props}
      />
      <Button
        className={styles["message-input_button"]}
        size={size}
        onClick={onSend}
      >
        <PaperPlaneIcon />
      </Button>
    </Flex>
  );
};
