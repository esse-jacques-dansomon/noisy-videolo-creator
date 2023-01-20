
export interface PaginationType <T> {
   data : T[];
   meta: Meta;

}
export interface Meta
{
  current_page: number;
  from:         null;
  last_page:    number;
  path:         string;
  per_page:     number;
  to:           null;
  total:        number;
  links?: Links;

}

export interface Links
{
   prev: string;
   next: string;
}
