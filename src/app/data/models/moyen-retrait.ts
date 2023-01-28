import {TypeMoyen} from "./type-moyen";

export interface MoyenRetrait {
  id:             number;
  full_name?:      string;
  bank_code?:      string;
  account_number?: string;
  guichet_code?:   string;
  rib?:            string;
  phone_number?:   string;
  created_at?:     Date;
  updated_at?:     Date;
  account_id?:     number;
  type_moyen_id?:  number;
  type_moyen : TypeMoyen
}
