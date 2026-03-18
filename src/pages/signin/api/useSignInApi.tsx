import { useState } from "react";
import { userStateService } from "@entities/user";
import { api } from "@shared/api";
import { RESPONSE_STATUS } from "@shared/model";
import { setLocalStorageItem } from "@shared/lib";
import { IHandleSignInProps } from "./types";

export const useSignInApi = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSignIn = async ({
    data,
    successCallback,
  }: IHandleSignInProps) => {
    try {
      setErrorMessage("");
      setIsLoading(true);
      const { status, response } = await api.signin(data);

      if (status === RESPONSE_STATUS.FAILED) {
        setErrorMessage(response.message);
        setIsLoading(false);
        return;
      }
      setLocalStorageItem({
        key: "access_token",
        value: response.access_token,
      });
      userStateService.setState(response);
      setIsLoading(false);
      successCallback?.();
    } catch (error) {
      console.error(error);
    }
  };

  return { isLoading, errorMessage, handleSignIn } as const;
};
