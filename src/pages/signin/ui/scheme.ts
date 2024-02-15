import { Input } from "@vkontakte/vkui";
import { IFormScheme } from "./types";

export const FORM_SCHEME: IFormScheme[] = [
  {
    name: "username",
    formItemProps: {
      htmlFor: "username",
      top: "Имя",
      bottomId: "username-type",
    },
    Component: Input,
  },
  {
    name: "password",
    formItemProps: {
      htmlFor: "password",
      top: "Пароль",
      bottomId: "password-type",
    },
    componentProps: {
      type: "password",
    },
    Component: Input,
  },
];
