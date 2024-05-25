import React, { FC } from "react";
import { Flex, Avatar, Text } from "@radix-ui/themes";
import classNames from "classnames";
import { IChatItemProps } from "./types";
import styles from "./ChatItem.modules.css";

export const ChatItem: FC<IChatItemProps> = ({
  username,
  preview,
  selected,
  isTyping,
}) => {
  return (
    <Flex
      direction="row"
      gap="2"
      className={classNames(styles["chat-item-wrapper"], {
        [styles["chat-item-wrapper--selected"]]: selected,
      })}
    >
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
