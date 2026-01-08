export type ApiResponse<T> = {
  success: boolean;
  data: T;
};

export type ApiListResponse<T> = ApiResponse<T[]> & {
  count: number;
};