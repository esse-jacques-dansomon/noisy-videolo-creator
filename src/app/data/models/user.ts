import {Role} from "./role";

export interface User {
  id:         number;
  email:      string;
  first_name: string;
  last_name:  string;
  slug:       string;
  role:       Role;
}
