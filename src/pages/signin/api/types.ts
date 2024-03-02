import { ISignInDto } from "@shared/model";

export interface IHandleSignInProps {
  data: ISignInDto;
  successCallback?: VoidFunction;
}
