import React, { FC, cloneElement, isValidElement, forwardRef } from "react";
import { useFormContext } from "react-hook-form";
import { FormItem } from "@vkontakte/vkui";
import { IFormFieldProps, IForwardRefFieldAdapterProps } from "./types";

// реализован ради нивелирования ошибки в консоли от react-hook-form,
// тк либа не видит прокинутого рефа путем forwardRef
const ForwardRefFieldAdapter = forwardRef<
  HTMLInputElement,
  IForwardRefFieldAdapterProps
>(({ children, ...props }, ref) => {
  return isValidElement(children)
    ? cloneElement(children, {
        ...props,
        getRef: ref,
      })
    : null;
});

export const FormField: FC<IFormFieldProps> = ({
  name,
  children,
  formItemProps,
  registerOptions,
}) => {
  const { register, getFieldState } = useFormContext();
  const { error, invalid } = getFieldState(name);

  return (
    <FormItem
      {...formItemProps}
      bottom={invalid ? error?.message : null}
      status={invalid ? "error" : "default"}
    >
      <ForwardRefFieldAdapter {...register(name, registerOptions)}>
        {isValidElement(children) ? children : null}
      </ForwardRefFieldAdapter>
    </FormItem>
  );
};
