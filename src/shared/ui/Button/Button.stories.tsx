import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta = {
  title: "UI-KIT/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: "text",
    },
    variant: {
      control: "select",
      options: ["classic", "solid", "soft", "surface", "outline", "ghost"],
    },
    size: {
      control: "select",
      options: ["1", "2", "3", "4"],
    },
    radius: {
      control: "select",
      options: ["none", "small", "medium", "large", "full"],
    },
  },
  args: {
    children: "press me",
    variant: "solid",
    size: "2",
    radius: "medium",
  },
} as Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ButtonStory: Story = {
  args: {},
  render: (props) => <Button {...props}>{props.children}</Button>,
};
