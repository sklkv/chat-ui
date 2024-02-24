import { FetchService } from "./fetch";
import { API_ROUTES, ISignInDto, ISignUpDto } from "@shared/model";

class ApiService extends FetchService {
  constructor() {
    super();
  }

  public signin(data: ISignInDto) {
    return this.post(API_ROUTES.SIGNIN, {
      body: JSON.stringify(data),
    });
  }

  public signup(data: ISignUpDto) {
    return this.post(API_ROUTES.SIGNUP, {
      body: JSON.stringify(data),
    });
  }
}

export const api = new ApiService();
