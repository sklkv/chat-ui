import React, { FC } from "react";
import { Flex, Avatar, Text } from "@radix-ui/themes";
import { IChatItemProps } from "./types";

export const ChatItem: FC<IChatItemProps> = ({
  username,
  preview,
  isTyping,
}) => {
  return (
    <Flex direction="row" gap="2">
      <Avatar size="4" fallback={username.substring(0, 1).toUpperCase()} />
      <Flex direction="column">
        <Text size="4">{username}</Text>
        {isTyping ? (
          <Text size="2" color="amber">
            Печатает...
          </Text>
        ) : (
          <Text size="2">{preview}</Text>
        )}
      </Flex>
    </Flex>
  );
};
