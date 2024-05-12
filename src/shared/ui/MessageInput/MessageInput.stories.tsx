import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { MessageInput } from "./MessageInput";

const meta = {
  title: "UI-KIT/MessageInput",
  component: MessageInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: "text",
    },
    width: {
      control: "text",
    },
    placeholder: {
      control: "text",
    },
  },
  args: {
    value: "",
    size: "2",
    width: "500px",
    placeholder: "Start conversation...",
  },
} as Meta<typeof MessageInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MessageInputStory: Story = {
  args: {},
  render: (props) => {
    const [value, setValue] = useState<string>(props?.value || "");

    const onChange = (value: string) => {
      setValue(value);
    };

    return <MessageInput {...props} value={value} onChange={onChange} />;
  },
};
