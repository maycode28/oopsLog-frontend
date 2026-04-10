export interface LoginRequest {
  loginId: string;
  password: string;
}

export interface SignupRequest {
  loginId: string;
  password: string;
  name: string;
  nickname: string;
  email: string;
  phoneNumber: string;
  birthDate: string;
}

export interface LoginResponse {
  userId: number;
  loginId: string;
  nickname: string;
}

export interface UserResponse {
  userId: number;
  loginId: string;
  name: string;
  nickname: string;
  birthDate: string | null;
  phoneNumber: string | null;
  email: string;
  createdAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface AuthError {
  success?: boolean;
  message: string;
  data?: null;
}