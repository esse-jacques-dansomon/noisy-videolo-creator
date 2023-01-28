import {Account} from "./account";
import {Creator} from "./creator";
import {MoyenRetrait} from "./moyen-retrait";

export interface Retrait {
  id:           number;
  amount:    number;
  status:    string;
  created_at:   string;
  account:      Account;
  creator:      Creator;
  moyenRetrait: MoyenRetrait;
}
