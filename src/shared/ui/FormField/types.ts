import { ReactElement } from "react";
import { RegisterOptions, UseFormRegisterReturn } from "react-hook-form";
import { FormItemProps, InputProps } from "@vkontakte/vkui";

export interface IFormFieldProps {
  name: string;
  formItemProps: FormItemProps;
  children: ReactElement<InputProps>;
  registerOptions: RegisterOptions;
}

export interface IForwardRefFieldAdapterProps
  extends UseFormRegisterReturn<string> {
  children: ReactElement<InputProps> | null;
}
