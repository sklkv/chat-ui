import { IUser } from "../types";

export enum API_BASE_URL {
  DEV = "http://localhost:4000",
}

export enum API_ROUTES {
  SIGNUP = "/auth/signup",
  SIGNIN = "/auth/signin",
  PROFILE = "/auth/profile",
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

export interface IProfileResponse extends IUser {}

export interface ISignInResponse extends IProfileResponse {
  access_token: string;
}

export interface ISignUpResponse extends ISignInResponse {}

export enum WS_EVENTS {
  SEND_MESSAGE = "send_message",
  RECEIVE_MESSAGE = "receive_message",
  JOIN_CHAT = "join_chat",
  LEAVE_CHAT = "leave_chat",
  TYPING = "typing",
  STOP_TYPING = "stop_typing",
}
