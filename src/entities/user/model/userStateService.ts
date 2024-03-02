import { StateService } from "@shared/model";
import { IUser } from "@shared/model";

class UserStateService extends StateService<IUser | null> {}

export const userStateService = new UserStateService(null);
