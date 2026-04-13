import type {
  LoginRequest,
  LoginResponse,
  SignupRequest,
  UserResponse,
} from '../types/auth.types';
import { requestJson } from '../../../services/api/http';

export const authApi = {
  login: async (body: LoginRequest): Promise<LoginResponse> => {
    return requestJson<LoginResponse>('/api/users/login', {
      method: 'POST',
      body: JSON.stringify(body),
    });
  },

  signup: async (body: SignupRequest): Promise<UserResponse> => {
    return requestJson<UserResponse>('/api/users/signup', {
      method: 'POST',
      body: JSON.stringify(body),
    });
  },

  logout: async (): Promise<void> => {
    await requestJson<null>('/api/users/logout', {
      method: 'POST',
    });
  },

  getMyInfo: async (userId: number): Promise<UserResponse> => {
    return requestJson<UserResponse>(`/api/users/${userId}`, {
      method: 'GET',
    });
  },
};
