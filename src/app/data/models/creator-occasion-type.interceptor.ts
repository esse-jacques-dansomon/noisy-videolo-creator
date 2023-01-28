import {OccasionType} from "./occasion-type";
import {Creator} from "./creator";

export interface CreatorOccasionType {
  id: number;
  creator_id: number;
  occasion_type_id: number;
  occasionType: OccasionType;
  creator: Creator;
  price: number
}
