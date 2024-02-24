import { ElementType } from "react";
import { FormItemProps } from "@vkontakte/vkui";
import { RegisterOptions } from "react-hook-form";
import { ISignInDto } from "@shared/model";

export interface IFormFields extends ISignInDto {}

export interface IFormScheme {
  name: keyof IFormFields;
  registerOptions: RegisterOptions;
  formItemProps: FormItemProps;
  componentProps?: Record<string, string | boolean>;
  Component: ElementType;
}
