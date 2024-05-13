import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./Input";

const meta = {
  title: "UI-KIT/Input",
  component: Input,
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
    disabled: {
      control: "boolean",
    },
  },
  args: {
    value: "",
    size: "2",
    width: "500px",
    placeholder: "Placeholder...",
    disabled: false,
  },
} as Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InputStory: Story = {
  args: {},
  render: (props) => {
    const [value, setValue] = useState<string | number>(props?.value || "");

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    };

    return <Input {...props} value={value} onChange={onChange} />;
  },
};
