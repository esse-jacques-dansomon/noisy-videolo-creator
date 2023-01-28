import {Category} from "./category";

export interface SubCategory {
  id:          number;
  name:        string;
  slug:        string;
  description: string;
  category_id: number;
  category: Category;
}
