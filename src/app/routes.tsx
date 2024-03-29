import { createBrowserRouter } from "react-router-dom";
import { Layout } from "@shared/ui";
import { Chat } from "@pages/chat";
import { Signin } from "@pages/signin";
import { Signup } from "@pages/signup";
import { AuthChecker } from "@features/authChecker";
import { APP_ROUTES } from "@shared/model";

export const routes = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        element: (
          <AuthChecker>
            <Chat />
          </AuthChecker>
        ),
      },
      {
        path: APP_ROUTES.SIGNIN.replace("/", ""),
        Component: Signin,
      },
      {
        path: APP_ROUTES.SIGNUP.replace("/", ""),
        Component: Signup,
        index: true,
      },
    ],
  },
]);
