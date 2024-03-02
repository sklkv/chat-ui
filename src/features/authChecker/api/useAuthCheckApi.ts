import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userStateService } from "@entities/user";
import { api } from "@shared/api";
import { getLocalStorageItem } from "@shared/lib";
import { APP_ROUTES, RESPONSE_STATUS } from "@shared/model";

export const useAuthCheckApi = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const user = userStateService.getState();

  useEffect(() => {
    const accessToken = getLocalStorageItem("access_token");
    if (!accessToken) {
      console.log("access_token", accessToken);
      navigate(APP_ROUTES.SIGNIN);
    }

    if (!user) {
      const handleCheckProfile = async () => {
        setIsLoading(true);
        const { response, status } = await api.profile();
        if (status === RESPONSE_STATUS.FAILED) {
          // TODO: handle
          // setIsLoading(false);
          return;
        }
        userStateService.setState(response);
        setIsLoading(false);
      };

      handleCheckProfile();
    }
  }, []);

  return { isLoading } as const;
};
