import React, { FC } from "react";
import { useAuthCheckApi } from "../api";
import { IAuthCheckerProps } from "./types";

export const AuthChecker: FC<IAuthCheckerProps> = (props) => {
  const { isLoading } = useAuthCheckApi();
  return isLoading ? <div>make spinner</div> : props.children;
};
