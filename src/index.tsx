import React, { createRoot } from "react-dom/client";
import { App } from "@app/index";

const rootElement = document.getElementById("root");

const root = createRoot(rootElement!);
root.render(<App />);
