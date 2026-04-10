import type {
  ApiResponse,
  LoginRequest,
  LoginResponse,
  SignupRequest,
  UserResponse,
} from '../types/auth.types';

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '';

const parseErrorMessage = async (res: Response, fallbackMessage: string) => {
  const err = await res.json().catch(() => null);

  if (err && typeof err.message === 'string') {
    return err.message;
  }

  return fallbackMessage;
};

export const authApi = {
  login: async (body: LoginRequest): Promise<LoginResponse> => {
    const res = await fetch(`${BASE_URL}/api/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const message = await parseErrorMessage(res, '로그인에 실패했습니다.');
      throw new Error(message);
    }

    const result: ApiResponse<LoginResponse> = await res.json();
    return result.data;
  },

  signup: async (body: SignupRequest): Promise<UserResponse> => {
    const res = await fetch(`${BASE_URL}/api/users/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const message = await parseErrorMessage(res, '회원가입에 실패했습니다.');
      throw new Error(message);
    }

    const result: ApiResponse<UserResponse> = await res.json();
    return result.data;
  },

  logout: async (): Promise<void> => {
  const res = await fetch(`${BASE_URL}/api/users/logout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });

  if (!res.ok) {
    const message = await parseErrorMessage(res, '로그아웃에 실패했습니다.');
    throw new Error(message);
  }
},

  getMyInfo: async (userId: number): Promise<UserResponse> => {
    const res = await fetch(`${BASE_URL}/api/users/${userId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });

    if (!res.ok) {
      const message = await parseErrorMessage(res, '사용자 정보를 불러오지 못했습니다.');
      throw new Error(message);
    }

    const result: ApiResponse<UserResponse> = await res.json();
    return result.data;
  },
};