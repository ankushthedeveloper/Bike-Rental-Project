export interface ServiceResponse<T> {
  statusCode: number;
  data: T;
  message: string;
}
