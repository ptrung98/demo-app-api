export type ResponseDto<T = any> = {
  success: boolean;
  message?: string;
  data?: T;
  error?: string | null;
  meta?: Record<string, any> | null;
}