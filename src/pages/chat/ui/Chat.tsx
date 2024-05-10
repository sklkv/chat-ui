import React, { FC, useState, useEffect, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  PanelHeader,
  Group,
  Spacing,
  Card,
  FixedLayout,
  Spinner,
} from "@vkontakte/vkui";
import { useWsContext } from "@shared/lib";
import { IMessage } from "@shared/model";
import { TextMessage, MessageInput } from "@shared/ui";
import { IChatProps } from "./types";

// import { userStateService } from "@entities/user";
import { MOCK_MESSAGES } from "./mock";

export const Chat: FC<IChatProps> = () => {
  const navigate = useNavigate();
  const {
    isWsReady,
    handleConnectWs,
    handleDisconnectWs,
    handleSendMessage,
    handleRecieveMessages,
  } = useWsContext();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [message, setMessage] = useState<string>("");
  const onMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleUpdateMessages = (message: IMessage) => {
    setMessages((prevState) => [...prevState, message]);
  };

  const sendMessage = () => {
    handleSendMessage({
      from: "nickname",
      message,
    });
    setMessage("");
  };

  useEffect(() => {
    // navigate(APP_ROUTES.SIGNIN);
    handleConnectWs();
    // handleRecieveMessages(handleUpdateMessages);
    return () => {
      handleDisconnectWs();
    };
  }, []);

  return (
    <>
      <FixedLayout vertical="top" filled>
        <PanelHeader>Чат</PanelHeader>
      </FixedLayout>
      {isWsReady ? (
        <Group>
          <Card mode="outline">
            <Spacing size={70} />
            {MOCK_MESSAGES.map((message, index) => (
              <TextMessage {...message} id={index} key={index} />
            ))}
            <Spacing size={70} />
          </Card>
        </Group>
      ) : (
        <div
          aria-busy={true}
          aria-live="polite"
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            height: "100vh",
          }}
        >
          <Spinner size="large" style={{ margin: "20px 0" }} />
        </div>
      )}
      <FixedLayout vertical="bottom" filled>
        <Spacing />
        <MessageInput maxHeight={150} multiline />
      </FixedLayout>
    </>
  );
};
