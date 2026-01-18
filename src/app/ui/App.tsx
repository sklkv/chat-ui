import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@shared/ui";
import { router } from "../lib";

// StrictMode выключен тк двойной рендер влияет на подключение вебсокета
export const App = () => {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};
