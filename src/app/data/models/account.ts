import {Creator} from "./creator";

export interface Account {

  id:                  number;
  balance:             number;
  creator_id:          number;
  created_at:          Date;
  updated_at:          Date;
  laravel_through_key: number;
  creator:             Creator;

}
