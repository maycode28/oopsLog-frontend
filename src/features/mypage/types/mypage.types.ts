import type { ApiResponse, UserResponse } from "../../auth/types/auth.types";

export interface FailureSummary {
  failureId: number;
  title: string | null;
  content: string;
  createdAt: string;
}

export interface DistortionCard {
  label: string;
  mistakenText: string;
  reframedText: string;
}

export interface FailureDetail {
  failureId: number;
  title: string | null;
  content: string;
  analysisMessage: string;
  createdAt: string;
  distortionCards: DistortionCard[];
  facts: string[];
}

export type UserProfileResponse = ApiResponse<UserResponse>;
export type FailureListResponse = ApiResponse<FailureSummary[]>;
export type FailureDetailResponse = ApiResponse<FailureDetail>;
