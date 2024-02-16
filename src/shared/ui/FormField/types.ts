import { ReactElement } from "react";
import { RegisterOptions } from "react-hook-form";
import { FormItemProps } from "@vkontakte/vkui";

export interface IFormFieldProps {
  name: string;
  formItemProps: FormItemProps;
  children: ReactElement;
  registerOptions: RegisterOptions;
}
