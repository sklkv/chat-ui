import { Input } from "@shared/ui";
import { IFormScheme } from "./types";

export const FORM_SCHEME: IFormScheme[] = [
  {
    name: "email",
    labelProps: {
      label: "Имя",
    },
    registerOptions: {
      required: true,
    },
    Component: Input,
  },
  {
    name: "password",
    labelProps: {
      label: "Пароль",
    },
    componentProps: {
      type: "password",
    },
    registerOptions: {
      required: true,
    },
    Component: Input,
  },
];
