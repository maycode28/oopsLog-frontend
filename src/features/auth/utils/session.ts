import type { LoginResponse } from "../types/auth.types";

const SESSION_STORAGE_KEY = "oopslog_user";

interface StoredSession {
  userId: number;
  loginId: string;
  nickname: string;
}

export const saveUserSession = (user: LoginResponse) => {
  const session: StoredSession = {
    userId: user.userId,
    loginId: user.loginId,
    nickname: user.nickname,
  };
  localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
};

export const clearUserSession = () => {
  localStorage.removeItem(SESSION_STORAGE_KEY);
};

export const getUserSession = (): StoredSession | null => {
  const raw = localStorage.getItem(SESSION_STORAGE_KEY);
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as Partial<StoredSession>;
    if (
      typeof parsed.userId === "number" &&
      typeof parsed.loginId === "string" &&
      typeof parsed.nickname === "string"
    ) {
      return {
        userId: parsed.userId,
        loginId: parsed.loginId,
        nickname: parsed.nickname,
      };
    }
  } catch {
    return null;
  }

  return null;
};

export const getSessionUserId = (): number | null => getUserSession()?.userId ?? null;
