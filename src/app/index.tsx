import React from "react";
import { RouterProvider } from "react-router-dom";
import { routes } from "./routes";
import "@vkontakte/vkui/dist/vkui.css";

// StrictMode выключен тк двойной рендер влияет на подключение вебсокета
export default function App() {
  return <RouterProvider router={routes} />;
}
