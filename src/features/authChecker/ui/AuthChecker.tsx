import React, { FC } from "react";
import { useAuthCheckApi } from "../api";
import { ScreenSpinner } from "@vkontakte/vkui";
import { IAuthCheckerProps } from "./types";

export const AuthChecker: FC<IAuthCheckerProps> = (props) => {
  const { isLoading } = useAuthCheckApi();
  return isLoading ? <ScreenSpinner /> : props.children;
};
