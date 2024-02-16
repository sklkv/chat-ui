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
    componentProps: {},
    registerOptions: {
      required: true,
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
    registerOptions: {
      required: true,
      pattern: /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
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
    registerOptions: {
      required: true,
      pattern: {
        value: /^\S+@\S+$/i,
        message: "Неверный формат",
      },
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
    registerOptions: {
      required: true,
      minLength: {
        value: 8,
        message: "Пароль должен содержать от 8 до 16 символов",
      },
      maxLength: {
        value: 16,
        message: "Пароль должен содержать от 8 до 16 символов",
      },
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
    registerOptions: {
      required: true,
      validate: (value, { password }) => {
        if (value !== password) {
          return "Подтверждение пароля не совпадает с паролем";
        }
        return true;
      },
    },
    Component: Input,
  },
];
