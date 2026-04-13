import type { AnimalConfig, GameTip, ScreenName } from "../types/mindTuning.types";

export const SCREEN_ORDER: ScreenName[] = ["confession", "scanning", "rescue"];

export const SCANNING_DELAY = 500;
export const RESTART_LOADING_DELAY = 1100;

export const GAME_TIPS: GameTip[] = [
  "감정은 없애는 대상이 아니라, 이름 붙여 줄수록 다루기 쉬워집니다.",
  "한 번에 완벽한 위로보다 한 문장의 현실적인 반박이 더 오래 갑니다.",
  "사실과 해석을 나눠 적으면 왜곡된 생각을 더 빨리 발견할 수 있습니다.",
  "마음이 복잡할수록 짧고 구체적인 행동 계획이 불안을 줄이는 데 도움이 됩니다.",
  "동물을 모두 구조한 뒤 결과 문장을 다시 읽으면 내 생각 패턴이 더 선명하게 보입니다.",
];

export const RESCUE_ANIMALS: AnimalConfig[] = [
  { id: "turtle", emoji: "🐢", name: "거북이" },
  { id: "squirrel", emoji: "🐿️", name: "다람쥐" },
  { id: "rabbit", emoji: "🐇", name: "토끼" },
];

export const RESCUE_PHASE_DELAY = 1500;
export const RESCUE_COMPLETE_DELAY = 3000;
export const SCORE_POPUP_DURATION = 1400;
