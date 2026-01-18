import { FC } from "react";
import { Card, Flex, Text } from "@radix-ui/themes";
import { ITextMessageProps } from "./types";

export const TextMessage: FC<ITextMessageProps> = ({
  position,
  title,
  text,
  date,
}) => {
  return (
    <Flex
      direction="row"
      width="100%"
      justify={position === "left" ? "start" : "end"}
    >
      <Card>
        <Flex direction="column" gap="1">
          <Text size="2" color={position === "left" ? "bronze" : "sky"}>
            {title}
          </Text>
          <Text size="3">{text}</Text>
          <Text>{date.toString()}</Text>
        </Flex>
      </Card>
    </Flex>
  );
};
