import { FC } from "react";
import { useAuthCheckApi } from "../api";
import { IAuthGuardProps } from "./types";

// TODO: rename to guard
export const AuthChecker: FC<IAuthGuardProps> = (props) => {
  const { isLoading } = useAuthCheckApi();
  return isLoading ? <div>make spinner</div> : props.children;
};
