import React from "react";
import { useLocation, Outlet } from "react-router-dom";
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
import { WsProvider } from "@shared/ui";

export const Layout = () => {
  const location = useLocation();
  return (
    <ConfigProvider platform="vkcom" appearance="light">
      <AdaptivityProvider>
        <AppRoot mode="full">
          <SplitLayout style={{ justifyContent: "center" }}>
            <SplitCol maxWidth="900px">
              <WsProvider>
                <View activePanel={location.pathname}>
                  <Panel id={location.pathname}>
                    <Outlet />
                  </Panel>
                </View>
              </WsProvider>
            </SplitCol>
          </SplitLayout>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
};
