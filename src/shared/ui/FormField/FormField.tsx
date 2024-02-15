import React, { FC, cloneElement, isValidElement } from "react";
import { useFormContext } from "react-hook-form";
import { FormItem } from "@vkontakte/vkui";
import { IFormFieldProps } from "./types";

// TODO: сделать fowardRef обертку над WrappedElement
export const FormField: FC<IFormFieldProps> = ({
  name,
  children,
  formItemProps,
}) => {
  const { register } = useFormContext();

  const WrappedElement = isValidElement(children)
    ? // @ts-ignore
      cloneElement(children, { ...register(name), getRef: register(name).ref })
    : null;

  return <FormItem {...formItemProps}>{WrappedElement}</FormItem>;
};
