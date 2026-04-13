import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../api/authApi';
import type { LoginRequest, SignupRequest } from '../types/auth.types';
import { clearUserSession, saveUserSession } from '../utils/session';

export function useAuth() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (data: LoginRequest) => {
    setIsLoading(true);
    setError(null);

    try {
      const user = await authApi.login(data);
      saveUserSession(user);
      navigate('/mind-tuning');
    } catch (err) {
      setError(err instanceof Error ? err.message : '로그인 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (data: SignupRequest) => {
    setIsLoading(true);
    setError(null);

    try {
      await authApi.signup(data);
      navigate('/login');
    } catch (err) {
      setError(err instanceof Error ? err.message : '회원가입 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await authApi.logout();
      clearUserSession();
      navigate('/login');
    } catch (err) {
      setError(err instanceof Error ? err.message : '로그아웃 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return { login, signup, logout, isLoading, error };
}

