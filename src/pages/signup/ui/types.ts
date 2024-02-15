import { ElementType } from "react";
import { FormItemProps } from "@vkontakte/vkui";

export interface IFormFields {
  username: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IFormScheme {
  name: keyof IFormFields;
  formItemProps: FormItemProps;
  componentProps?: Record<string, string | boolean>;
  Component: ElementType;
}
