export interface Page<T> {
  items: T[];
  hasMore: boolean;
  nextOffset: number;
}
