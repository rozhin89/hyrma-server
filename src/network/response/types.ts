export interface AppSuccessResponse<Data> {
  success: true;
  status: number;
  data: Data;
}

export interface AppErrorResponse {
  success: false;
  code: number;
  message: string;
}
