import { ElementType } from "react";
import { RegisterOptions } from "react-hook-form";
import { ISignInDto } from "@shared/model";

export interface IFormFields extends ISignInDto {}

export interface IFormScheme {
  name: keyof IFormFields;
  registerOptions: RegisterOptions;
  labelProps?: {
    label: string;
  };
  componentProps?: Record<string, string | boolean>;
  Component: ElementType;
}
