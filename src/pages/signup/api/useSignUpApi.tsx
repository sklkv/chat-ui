import { useState } from "react";
import { api } from "@shared/api";
import { RESPONSE_STATUS } from "@shared/model";
import { setLocalStorageItem } from "@shared/lib";
import { IHandleSignUpProps } from "./types";

export const useSignUpApi = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSignUp = async ({
    data,
    successCallback,
  }: IHandleSignUpProps) => {
    setErrorMessage("");
    setIsLoading(true);
    const { status, response } = await api.signup(data);

    if (status === RESPONSE_STATUS.FAILED) {
      setErrorMessage(response.message);
      setIsLoading(false);
      return;
    }
    setLocalStorageItem({ key: "access_token", value: response.access_token });
    setIsLoading(false);
    successCallback?.();
  };
  return { isLoading, errorMessage, handleSignUp } as const;
};
