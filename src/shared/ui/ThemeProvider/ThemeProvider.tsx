import React, { FC, PropsWithChildren } from "react";
import { Theme, ThemeProps } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";

export const ThemeProvider: FC<PropsWithChildren<ThemeProps>> = ({
  children,
  ...props
}) => {
  return <Theme {...props}>{children}</Theme>;
};
