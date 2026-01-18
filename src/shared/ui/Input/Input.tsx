import { forwardRef } from "react";
import { TextField } from "@radix-ui/themes";

import { IInputProps } from "./types";

export const Input = forwardRef<HTMLInputElement, IInputProps>((props, ref) => {
  return <TextField.Root ref={ref} {...props} />;
});
