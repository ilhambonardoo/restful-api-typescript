export type Pagging = {
  current_page: number;
  total_page: number;
  total_item: number;
};

export type Pageable<T> = {
  data: Array<T>;
  pagging: Pagging;
};
