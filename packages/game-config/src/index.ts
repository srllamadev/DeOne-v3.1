export const GAME_CONFIG = {
  APP_TITLE: "Stellar Game Wallet",
  VERSION: "0.1.0",
  CANVAS_WIDTH: 800,
  CANVAS_HEIGHT: 600,
  FPS: 60,
} as const;

export const PLAYER_LEVELS = {
  MAX_LEVEL: 100,
  BASE_XP: 100,
  XP_MULTIPLIER: 1.5,
} as const;

export const CHEST_TYPES = {
  WOODEN: "wooden",
  SILVER: "silver",
  GOLDEN: "golden",
  MYTHIC: "mythic",
} as const;

export type ChestType = (typeof CHEST_TYPES)[keyof typeof CHEST_TYPES];

export function xpForLevel(level: number): number {
  return Math.floor(PLAYER_LEVELS.BASE_XP * Math.pow(PLAYER_LEVELS.XP_MULTIPLIER, level - 1));
}
