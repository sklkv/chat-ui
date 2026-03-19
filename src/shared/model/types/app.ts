export interface IWsMessage {
  chat_id: string;
  user_id: number;
  type: string;
  text: string;
}

export interface IWsReceivedMessage {
  id: string;
  chat_id: string;
  user_id: number;
  type: string;
  text: string;
}

export interface ISignInDto {
  username: string;
  password: string;
}

export interface ISignUpDto {
  username: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
}
