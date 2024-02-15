import React, { ChangeEvent, useState } from "react";
import {
  AdaptivityProvider,
  ConfigProvider,
  AppRoot,
  SplitLayout,
  SplitCol,
  View,
  Panel,
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
// import { Signup } from "@pages/signup";
import { Signin } from "@pages/signin";
import { Chat } from "@pages/chat";
import { WsProvider } from "@shared/ui";
import { APP_VIEW } from "@shared/model";

// StrictMode выключен тк двойной рендер влияет на подключение вебсокета
// TODO: прикрутить роутинг
export default function App() {
  const [view, setView] = useState<APP_VIEW>(APP_VIEW.ENTRANCE);
  const [nickname, setNickname] = useState<string>("");

  const onNicknameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  return (
    // <StrictMode>
    <ConfigProvider platform="vkcom" appearance="light">
      <AdaptivityProvider>
        <AppRoot mode="full">
          <SplitLayout style={{ justifyContent: "center" }}>
            <SplitCol maxWidth="900px">
              <WsProvider>
                <View activePanel={view}>
                  <Panel id="entrance">
                    {/* <Entrance
                      nickname={nickname}
                      onNicknameChange={onNicknameChange}
                      // onSubmit={onSubmit}
                    /> */}
                    <Signin />
                    {/* <Signup /> */}
                  </Panel>
                  <Panel id="chat">
                    <Chat nickname={nickname} />
                  </Panel>
                </View>
              </WsProvider>
            </SplitCol>
          </SplitLayout>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
    // </StrictMode>
  );
}
