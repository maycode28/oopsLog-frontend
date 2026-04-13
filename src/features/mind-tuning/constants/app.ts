import type { AnimalConfig, GameTip, ScreenName } from "../types/mindTuning.types";

export const SCREEN_ORDER: ScreenName[] = ["confession", "scanning", "rescue"];

export const SCANNING_DELAY = 500;
export const RESTART_LOADING_DELAY = 1100;

export const GAME_TIPS: GameTip[] = [
  "감정은 없애는 대상이 아니라, 이름 붙여 줄수록 다루기 쉬워집니다.",
  "오늘 있었던 일과 내가 받아들인 방식을 나눠 적으면 길 잃은 마음을 더 빨리 찾을 수 있어요.",
  "한 번에 완벽해지려 하기보다, 동물 친구 한 마리씩 진정시킨다고 생각해 보세요.",
  "사실과 걱정을 구분해 적으면 마음속 소란이 조금씩 잦아듭니다.",
  "구조를 마친 뒤 결과 문장을 다시 읽으면 자주 흔들리는 생각 패턴이 더 선명해져요.",
];

export const RESCUE_ANIMALS: AnimalConfig[] = [
  { id: "animal-0", emoji: "🐢", name: "거북이" },
  { id: "animal-1", emoji: "🐿️", name: "다람쥐" },
  { id: "animal-2", emoji: "🐇", name: "토끼" },
  { id: "animal-3", emoji: "🦔", name: "고슴도치" },
  { id: "animal-4", emoji: "🦝", name: "라쿤" },
  { id: "animal-5", emoji: "🦊", name: "여우" },
  { id: "animal-6", emoji: "🐻", name: "곰" },
  { id: "animal-7", emoji: "🐥", name: "병아리" },
];

export const RESCUE_PHASE_DELAY = 1500;
export const RESCUE_COMPLETE_DELAY = 3000;
export const SCORE_POPUP_DURATION = 1400;
