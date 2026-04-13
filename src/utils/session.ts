import type { LoginResponse } from "../features/auth/types/auth.types";

export const getStoredUser = (): LoginResponse | null => {
  const raw = localStorage.getItem("user");

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as LoginResponse;
  } catch {
    localStorage.removeItem("user");
    return null;
  }
};
