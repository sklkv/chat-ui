import { FC } from "react";
import { Flex, TextArea, IconButton } from "@radix-ui/themes";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { IMessageInputProps } from "./types";

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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend?.();
    }
  };

  return (
    <Flex direction="row" justify="between" width={width} gap="2">
      <TextArea
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={value}
        size={size}
        disabled={disabled}
        style={{
          flex: 1,
        }}
        {...props}
      />
      <IconButton size={size} disabled={disabled} onClick={onSend}>
        <PaperPlaneIcon />
      </IconButton>
    </Flex>
  );
};
