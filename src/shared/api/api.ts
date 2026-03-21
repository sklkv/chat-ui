import { FetchService } from "./fetch";
import {
  API_ROUTES,
  ISignInDto,
  ISignUpDto,
  IProfileResponse,
  ISignInResponse,
  ISignUpResponse,
  IChatFromApi,
  IUserSearchResult,
  IMessageFromApi,
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

  public chats(): Promise<IChatFromApi[]> {
    return this.get(API_ROUTES.CHATS) as unknown as Promise<IChatFromApi[]>;
  }

  public getUsers(): Promise<IUserSearchResult[]> {
    return this.get(API_ROUTES.USERS) as unknown as Promise<IUserSearchResult[]>;
  }

  public searchUsers(query: string): Promise<IUserSearchResult[]> {
    return this.get(
      `${API_ROUTES.USERS_SEARCH}?query=${encodeURIComponent(query)}`
    ) as unknown as Promise<IUserSearchResult[]>;
  }

  public createChat(participants: number[]): Promise<IChatFromApi> {
    return this.post(API_ROUTES.CREATE_CHAT, {
      body: JSON.stringify({ participants }),
    }) as unknown as Promise<IChatFromApi>;
  }

  public getMessages(chatId: string, from = 0, to = 50): Promise<IMessageFromApi[]> {
    return this.get(
      `${API_ROUTES.MESSAGES}/${chatId}?from=${from}&to=${to}`
    ) as unknown as Promise<IMessageFromApi[]>;
  }
}

export const api = new ApiService();
