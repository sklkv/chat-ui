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
  // ScreenSpinner,
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import { WsProvider } from "@shared/ui";

export const Layout = () => {
  const { pathname } = useLocation();
  return (
    <ConfigProvider platform="vkcom" appearance="light">
      <AdaptivityProvider>
        <AppRoot mode="full">
          <SplitLayout
            // popout={<ScreenSpinner state="done">app spinner</ScreenSpinner>}
            style={{ justifyContent: "center" }}
          >
            <SplitCol maxWidth="900px">
              <WsProvider>
                <View activePanel={pathname}>
                  <Panel id={pathname}>
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
