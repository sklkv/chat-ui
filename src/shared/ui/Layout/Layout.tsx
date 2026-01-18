import { useNavigate, Outlet } from "react-router-dom";
import { Flex } from "@radix-ui/themes";
import { WsProvider, ErrorBoundary } from "@shared/ui";

export const Layout = () => {
  const navigate = useNavigate();
  return (
    <ErrorBoundary navigate={navigate}>
      <WsProvider>
        <Flex direction="column" justify="center" align="center" height="98vh">
          <Outlet />
        </Flex>
      </WsProvider>
    </ErrorBoundary>
  );
};
