import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ChatItem } from "./ChatItem";

const meta = {
  title: "UI-KIT/ChatItem",
  component: ChatItem,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    username: {
      control: "text",
    },
    preview: {
      control: "text",
    },
    selected: {
      control: "boolean",
    },
    isTyping: {
      control: "boolean",
    },
  },
  args: {
    username: "Tony",
    preview: "Lorem ipsum",
    selected: false,
    isTyping: false,
  },
} as Meta<typeof ChatItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ChatItemStory: Story = {
  args: {},
  render: (props) => {
    return <ChatItem {...props} />;
  },
};
