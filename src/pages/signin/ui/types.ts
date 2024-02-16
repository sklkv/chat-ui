import { ElementType } from "react";
import { FormItemProps } from "@vkontakte/vkui";
import { RegisterOptions } from "react-hook-form";

export interface IFormFields {
  username: string;
  password: string;
}

export interface IFormScheme {
  name: keyof IFormFields;
  registerOptions: RegisterOptions;
  formItemProps: FormItemProps;
  componentProps?: Record<string, string | boolean>;
  Component: ElementType;
}
