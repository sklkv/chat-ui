import React from "react";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@shared/ui";
import { routes } from "./routes";

// StrictMode выключен тк двойной рендер влияет на подключение вебсокета
export default function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={routes} />
    </ThemeProvider>
  );
}
