import { ElementType } from "react";
import { RegisterOptions } from "react-hook-form";
import { FormItemProps } from "@vkontakte/vkui";
import { ISignUpDto } from "@shared/model";

export interface IFormFields extends ISignUpDto {}

export interface IFormScheme {
  name: keyof IFormFields;
  registerOptions: RegisterOptions;
  formItemProps: FormItemProps;
  componentProps?: Record<string, string | boolean>;
  Component: ElementType;
}
