import { IUser } from "../types";

export enum API_BASE_URL {
  DEV = "http://localhost:4000",
}

export enum API_ROUTES {
  SIGNUP = "/auth/signup",
  SIGNIN = "/auth/signin",
  PROFILE = "/auth/profile",
  CHATS = "/chats/all",
  USERS = "/users",
  USERS_SEARCH = "/users/search",
  CREATE_CHAT = "/chats/create",
  MESSAGES = "/messages",
}

export interface IMessageFromApi {
  id: string;
  chat_id: string;
  user_id: number;
  type: string;
  text: string;
  createdAt: string;
}

export interface IChatFromApi {
  id: string;
  participants: number[];
}

export interface IUserSearchResult {
  id: number;
  username: string;
  email: string;
  phoneNumber: string;
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
  // Client → Server
  SEND_MESSAGE = "user-dispatch-message",
  JOIN_CHAT = "join-chat",
  LEAVE_CHAT = "leave-chat",
  TYPING = "user-typing",
  STOP_TYPING = "user-stop-typing",
  // Server → Client
  RECEIVE_MESSAGE = "server-dispatch-message",
  SERVER_TYPING = "server-user-typing",
  SERVER_STOP_TYPING = "server-user-stop-typing",
}
