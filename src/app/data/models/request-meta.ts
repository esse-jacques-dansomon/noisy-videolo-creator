export interface RequestMeta {
  current_page: number;
  last_page: number;
  from: number;
  per_page: number;
  total: number;
  path? : string ;
}
