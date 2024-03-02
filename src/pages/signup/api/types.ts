import { ISignUpDto } from "@shared/model";

export interface IHandleSignUpProps {
  data: ISignUpDto;
  successCallback?: VoidFunction;
}
