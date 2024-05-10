import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import "react-chat-elements/dist/main.css";

import { TextMessage } from './TextMessage';

const meta = {
  title: 'UI-KIT/TextMessage',
  component: TextMessage,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    id: {
      control: 'text',
    },
    title: {
      defaultValue: 'Title'
    },
    text: {
      control: 'text',
    },
    position: {
      control: 'select',
      options: ['right', 'left']
    },
    titleColor: {
      control: 'color'
    },
    date: {
      control: 'date'
    },
    status: {
      control: 'select',
      options: ['waiting', 'sent', 'received', 'read']
    }
  },
  args: {
    id: '1',
    title: 'Title',
    text: 'Some text',
    position: 'right',
    titleColor: 'blue',
    date: new Date(),
    status: 'read'
  },
} satisfies Meta<typeof TextMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TextMessageStory: Story = {
  args: {},
  render: (props) => (
    <TextMessage {...props} />
  )
};

