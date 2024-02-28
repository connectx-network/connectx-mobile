export interface Payload<T> {
  payload: T;
  type: string;
}
export interface Paging {
  page: number;
  size: number;
  totalElement: number;
  totalPages: number;
}
export interface DataList<T> extends Paging {
  data: T;
}
