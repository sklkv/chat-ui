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
    name: "phoneNumber",
    formItemProps: {
      htmlFor: "phoneNumber",
      top: "Телефон",
      bottomId: "phoneNumber-type",
    },
    componentProps: {
      type: "tel",
    },
    Component: Input,
  },
  {
    name: "email",
    formItemProps: {
      htmlFor: "email",
      top: "Электронная почта",
      bottomId: "email-type",
    },
    componentProps: {
      type: "email",
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
  {
    name: "confirmPassword",
    formItemProps: {
      htmlFor: "confirmPassword",
      top: "Пароль",
      bottomId: "confirmPassword-type",
    },
    componentProps: {
      type: "password",
    },
    Component: Input,
  },
];
