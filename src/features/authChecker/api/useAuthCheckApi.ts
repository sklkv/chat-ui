import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userStateService } from "@entities/user";
import { api } from "@shared/api";
import { getLocalStorageItem, useErrorBoundaryContext } from "@shared/lib";
import { APP_ROUTES, RESPONSE_STATUS } from "@shared/model";

export const useAuthCheckApi = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const user = userStateService.getState();
  const { setError } = useErrorBoundaryContext();

  useEffect(() => {
    const accessToken = getLocalStorageItem("access_token");
    if (!accessToken) {
      navigate(APP_ROUTES.SIGNIN);
    }

    if (!user && accessToken) {
      const handleCheckProfile = async () => {
        try {
          setIsLoading(true);
          const { response, status } = await api.profile();
          if (status === RESPONSE_STATUS.FAILED) {
            // TODO: handle
            setIsLoading(false);
            return;
          }
          userStateService.setState(response);
          setIsLoading(false);
        } catch (e) {
          setError(e as Error);
          console.warn(e);
        }
      };

      handleCheckProfile();
    }
  }, []);

  return { isLoading } as const;
};
