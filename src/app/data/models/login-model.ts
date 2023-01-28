import {User} from "./user";

export interface LoginModel {
  access_token: string;
  token_type:   string;
  user:         User;
}


