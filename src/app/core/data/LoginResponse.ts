import {User} from "../../data/models/user";

export interface LoginResponse{
  status: string;
  access_token: string;
  refresh_token: string;
  expires_in: number;
  user: User;

}

export interface LoginResponsePayload {
  id: number;
  roles: string[];
  first_name: string;
  last_name: string;

}
