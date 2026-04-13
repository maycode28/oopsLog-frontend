import type { UserResponse } from "../../auth/types/auth.types";
import type {
  FailureDetail,
  FailureDetailResponse,
  FailureListResponse,
  FailureSummary,
  UserProfileResponse,
} from "../types/mypage.types";

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

const parseErrorMessage = async (res: Response, fallbackMessage: string) => {
  const err = await res.json().catch(() => null);

  if (err && typeof err.message === "string") {
    return err.message;
  }

  return fallbackMessage;
};

export const mypageApi = {
  getUserProfile: async (userId: number): Promise<UserResponse> => {
    const res = await fetch(`${BASE_URL}/api/users/${userId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (!res.ok) {
      const message = await parseErrorMessage(
        res,
        "사용자 정보를 불러오지 못했습니다.",
      );
      throw new Error(message);
    }

    const result: UserProfileResponse = await res.json();
    return result.data;
  },

  getFailures: async (userId: number): Promise<FailureSummary[]> => {
    const res = await fetch(`${BASE_URL}/api/analyses/${userId}/failures`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (!res.ok) {
      const message = await parseErrorMessage(
        res,
        "실패 기록을 불러오지 못했습니다.",
      );
      throw new Error(message);
    }

    const result: FailureListResponse = await res.json();
    return result.data;
  },

  getFailureDetail: async (
    userId: number,
    failureId: number,
  ): Promise<FailureDetail> => {
    const res = await fetch(
      `${BASE_URL}/api/analyses/${userId}/failures/${failureId}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      },
    );

    if (!res.ok) {
      const message = await parseErrorMessage(
        res,
        "실패 상세 정보를 불러오지 못했습니다.",
      );
      throw new Error(message);
    }

    const result: FailureDetailResponse = await res.json();
    return result.data;
  },
};
