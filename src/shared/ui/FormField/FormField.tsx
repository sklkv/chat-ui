import { FC, cloneElement, isValidElement } from "react";
import { useFormContext } from "react-hook-form";
import { Flex, Text } from "@radix-ui/themes";
import { IFormFieldProps } from "./types";

export const FormField: FC<IFormFieldProps> = ({
  name,
  children,
  labelProps,
  registerOptions,
}) => {
  const { register, getFieldState } = useFormContext();
  const { error, invalid } = getFieldState(name);

  return (
    <Flex direction="column" gap="3">
      <label>
        <Text as="div" size="2" mb="1" weight="medium">
          {labelProps?.label}
        </Text>
        {isValidElement(children)
          ? cloneElement(children, {
              ...register(name, registerOptions),
            })
          : null}
      </label>
    </Flex>
  );
};
