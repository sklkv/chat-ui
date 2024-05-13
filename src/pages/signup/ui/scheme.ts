import { Input } from "@shared/ui";
import { IFormScheme } from "./types";

export const FORM_SCHEME: IFormScheme[] = [
  {
    name: "username",
    labelProps: {
      label: "Имя",
    },
    componentProps: {},
    registerOptions: {
      required: true,
    },
    Component: Input,
  },
  {
    name: "phoneNumber",
    labelProps: {
      label: "Телефон",
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
    labelProps: {
      label: "Электронная почта",
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
    labelProps: {
      label: "Пароль",
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
    labelProps: {
      label: "Подтверждение пароля",
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
