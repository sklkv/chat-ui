import { ReactElement } from "react";
import { RegisterOptions } from "react-hook-form";

export interface IFormFieldProps {
  name: string;
  labelProps?: {
    label: string;
  };
  children: ReactElement;
  registerOptions: RegisterOptions;
}
