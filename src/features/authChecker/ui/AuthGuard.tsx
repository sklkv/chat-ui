import { FC } from "react";
import { Spinner } from "@radix-ui/themes";
import { useAuthCheckApi } from "../api";
import { IAuthGuardProps } from "./types";

export const AuthGuard: FC<IAuthGuardProps> = (props) => {
  const { isLoading } = useAuthCheckApi();
  return isLoading ? <Spinner size="3" /> : props.children;
};
