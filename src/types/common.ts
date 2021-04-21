export interface IResponse<T> {
  data: Array<T>;
  count: string | undefined;
}
