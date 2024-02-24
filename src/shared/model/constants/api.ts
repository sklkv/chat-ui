export enum API_BASE_URL {
  DEV = "http://localhost:5000",
}

export enum API_ROUTES {
  SIGNUP = "/auth/signup",
  SIGNIN = "/auth/signin",
}

export enum RESPONSE_STATUS {
  OK = "OK",
  FAILED = "FAILED",
}

export interface ISuccessResponse<T> {
  status: RESPONSE_STATUS.OK;
  response: T;
}

export interface IFailedResponse {
  status: RESPONSE_STATUS.FAILED;
  response: {
    message: string;
  };
}
