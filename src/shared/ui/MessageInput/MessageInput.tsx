import React, { FC } from "react";
import { Flex, TextArea, IconButton } from "@radix-ui/themes";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { IMessageInputProps } from "./types";

import styles from "./MessageInput.modules.css";

export const MessageInput: FC<IMessageInputProps> = ({
  width = "100%",
  size,
  onChange,
  value,
  onSend,
  disabled,
  ...props
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <Flex direction="row" justify="between" width={width} gap="2">
      <TextArea
        className={styles["message-input_textarea"]}
        onChange={handleChange}
        value={value}
        size={size}
        disabled={disabled}
        {...props}
      />
      <IconButton size={size} disabled={disabled} onClick={onSend}>
        <PaperPlaneIcon />
      </IconButton>
    </Flex>
  );
};
