import { TextAreaProps } from "@radix-ui/themes";

export interface IMessageInputProps extends Omit<TextAreaProps, "onChange"> {
  width?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  onSend?: VoidFunction;
}
