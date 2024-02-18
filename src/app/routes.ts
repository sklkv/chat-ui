import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./Layout";
import { Chat } from "@pages/chat";
import { Signin } from "@pages/signin";
import { Signup } from "@pages/signup";

export const routes = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        // index: true,
        Component: Chat,
      },
      {
        // path: "signin",
        index: true,
        Component: Signin,
      },
      {
        path: "signup",
        Component: Signup,
      },
    ],
  },
]);
