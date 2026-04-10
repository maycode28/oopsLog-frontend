export const SCREEN_ORDER = ["confession", "scanning", "rescue"] as const;

export type ScreenName = (typeof SCREEN_ORDER)[number];
