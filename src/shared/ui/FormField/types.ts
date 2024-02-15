import { ReactElement } from "react";
import { FormItemProps } from "@vkontakte/vkui";

export interface IFormFieldProps {
  name: string;
  formItemProps: FormItemProps;
  children: ReactElement;
}
