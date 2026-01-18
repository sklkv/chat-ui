import { FC } from "react";
import { useAuthCheckApi } from "../api";
import { IAuthCheckerProps } from "./types";

// TODO: rename to guard
export const AuthChecker: FC<IAuthCheckerProps> = (props) => {
  const { isLoading } = useAuthCheckApi();
  return isLoading ? <div>make spinner</div> : props.children;
};
