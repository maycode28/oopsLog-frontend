export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
}