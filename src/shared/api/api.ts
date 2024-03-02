import { FetchService } from "./fetch";
import {
  API_ROUTES,
  ISignInDto,
  ISignUpDto,
  IProfileResponse,
  ISignInResponse,
  ISignUpResponse,
} from "@shared/model";

class ApiService extends FetchService {
  constructor() {
    super();
  }

  public signin(data: ISignInDto) {
    return this.post<ISignInResponse>(API_ROUTES.SIGNIN, {
      body: JSON.stringify(data),
    });
  }

  public signup(data: ISignUpDto) {
    return this.post<ISignUpResponse>(API_ROUTES.SIGNUP, {
      body: JSON.stringify(data),
    });
  }

  public profile() {
    return this.get<IProfileResponse>(API_ROUTES.PROFILE);
  }
}

export const api = new ApiService();
