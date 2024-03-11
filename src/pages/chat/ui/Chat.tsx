import React, { FC, useState, useEffect, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  PanelHeader,
  Group,
  Spacing,
  WriteBar,
  WriteBarIcon,
  Card,
  CardGrid,
  FixedLayout,
  Spinner,
} from "@vkontakte/vkui";
import { Message } from "@entities/message";
import { useWsContext } from "@shared/lib";
import { IMessage, APP_ROUTES } from "@shared/model";
import { IChatProps } from "./types";

import { userStateService } from "@entities/user";

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
    // handleConnectWs();
    // handleRecieveMessages(handleUpdateMessages);
    // return () => {
    //   handleDisconnectWs();
    // };
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
            <CardGrid size="l" style={{ marginTop: "auto" }}>
              {messages.map((item, index) => (
                <Message key={index} from={item.from} message={item.message} />
              ))}
            </CardGrid>
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
        <WriteBar
          value={message}
          onChange={onMessageChange}
          shadow
          disabled={!isWsReady}
          after={
            <>
              <WriteBarIcon
                mode="send"
                aria-label="Отправить сообщение"
                disabled={message.length === 0}
                onClick={sendMessage}
              />
            </>
          }
        />
      </FixedLayout>
    </>
  );
};
