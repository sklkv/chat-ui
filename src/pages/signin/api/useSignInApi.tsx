import { useState } from "react";
import { api } from "@shared/api";
import { ISignInDto, RESPONSE_STATUS } from "@shared/model";

export const useSignInApi = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSignIn = async (
    data: ISignInDto,
    successCallback?: VoidFunction
  ) => {
    setErrorMessage("");
    setIsLoading(true);
    const { status, response } = await api.signin(data);

    if (status === RESPONSE_STATUS.FAILED) {
      setErrorMessage(response.message);
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
    successCallback?.();
  };
  return { isLoading, errorMessage, handleSignIn } as const;
};
