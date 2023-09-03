export interface LoginResponse {
  code: number;
  message: string;
  token?: string;
  user_id?: number;
}
