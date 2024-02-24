export interface IMessage {
  from: string;
  message: string;
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
