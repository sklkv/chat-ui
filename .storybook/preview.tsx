import React from "react";
import type { Preview } from "@storybook/react";
import { ThemeProvider } from "../src/shared/ui/ThemeProvider";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => {
      return (
        <ThemeProvider
          accentColor="blue"
          grayColor="sage"
          panelBackground="solid"
          scaling="100%"
          radius="medium"
        >
          <Story />
        </ThemeProvider>
      );
    },
  ],
};

export default preview;
