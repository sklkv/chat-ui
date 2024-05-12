import React, { FC } from "react";
import { TextField } from "@radix-ui/themes";

import { IInputProps } from "./types";

export const Input: FC<IInputProps> = (props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props?.onChange?.(e.target.value);
  };
  return <TextField.Root {...props} onChange={handleChange} />;
};
