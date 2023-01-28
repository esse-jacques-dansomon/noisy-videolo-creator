import {SubCategory} from "./sub-category";

export interface Category {
  id:          number;
  name:        string;
  slug:        string;
  description: string;
  subcategories: SubCategory[];
}

