import {OccasionType} from "./occasion-type";

export interface Occasion {
  id:   number;
  name: string;
  icon: string;
  occasion_type_id: number;
  occasion_type : OccasionType;
}
