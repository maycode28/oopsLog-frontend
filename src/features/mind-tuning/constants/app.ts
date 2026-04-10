import type { AnimalConfig, ScreenName } from "../types/mindTuning.types";

export const SCREEN_ORDER: ScreenName[] = ["confession", "scanning", "rescue"];

export const SCANNING_DELAY = 500;

export const RESCUE_ANIMALS: AnimalConfig[] = [
  { id: "turtle", emoji: "🐢", name: "거북이" },
  { id: "squirrel", emoji: "🐿️", name: "다람쥐" },
  { id: "bird", emoji: "🐦", name: "새" },
];

export const RESCUE_PHASE_DELAY = 1500;
export const RESCUE_COMPLETE_DELAY = 3000;
export const SCORE_POPUP_DURATION = 1400;
