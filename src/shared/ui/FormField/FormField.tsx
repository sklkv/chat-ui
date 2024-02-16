import React, { FC, cloneElement, isValidElement } from "react";
import { useFormContext } from "react-hook-form";
import { FormItem } from "@vkontakte/vkui";
import { IFormFieldProps } from "./types";

// TODO: сделать fowardRef обертку над WrappedElement
export const FormField: FC<IFormFieldProps> = ({
  name,
  children,
  formItemProps,
  registerOptions,
}) => {
  const { register, getFieldState } = useFormContext();

  const WrappedElement = isValidElement(children)
    ? cloneElement(children, {
        ...register(name, registerOptions),
        // @ts-ignore
        getRef: register(name).ref,
      })
    : null;

  const { error, invalid } = getFieldState(name);

  return (
    <FormItem
      {...formItemProps}
      bottom={invalid ? error?.message : null}
      status={invalid ? "error" : "default"}
    >
      {WrappedElement}
    </FormItem>
  );
};
