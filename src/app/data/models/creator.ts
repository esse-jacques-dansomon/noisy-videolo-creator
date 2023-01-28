import {OccasionType} from "./occasion-type";
import {CreatorOccasionType} from "./creator-occasion-type.interceptor";
import {SubCategory} from "./sub-category";
import {Account} from "./account";

export interface Creator {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  pseudo_social_network: string;
  profile_image?: any;
  video_presentation?: any;
  slug: string;
  titre?: any;
  description?: any;
  answer_time?: any;
  is_featured:  boolean;
  is_available: boolean;
  is_blocked: boolean;
  occasionsTypes: CreatorOccasionType[];
  account: Account;
  sub_category: SubCategory;
  withdrawals: any[];
}
