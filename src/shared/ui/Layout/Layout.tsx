import React from "react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
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
import { WsProvider, ErrorBoundary } from "@shared/ui";

export const Layout = () => {
  const naigate = useNavigate();
  const { pathname } = useLocation();
  return (
    <ErrorBoundary navigate={naigate}>
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
    </ErrorBoundary>
  );
};
