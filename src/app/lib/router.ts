import { createBrowserRouter } from "react-router-dom";
import { Layout } from "@shared/ui";
import { Chat } from "@pages/chat";
import { Signin } from "@pages/signin";
import { Signup } from "@pages/signup";
import { ProtectedRoute } from "@features/authChecker";
import { APP_ROUTES } from "@shared/model";

export const router = createBrowserRouter(
  [
    {
      path: APP_ROUTES.BASENAME,
      Component: Layout,
      children: [
        {
          Component: ProtectedRoute,
          children: [
            {
              path: APP_ROUTES.CHAT,
              Component: Chat,
            },
          ],
        },
        {
          path: APP_ROUTES.SIGNIN,
          Component: Signin,
        },
        {
          path: APP_ROUTES.SIGNUP,
          Component: Signup,
        },
      ],
    },
  ],
  { basename: APP_ROUTES.BASENAME }
);
