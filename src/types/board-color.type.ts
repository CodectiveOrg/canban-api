export const BOARD_COLORS = Object.freeze([
  "blue",
  "green",
  "yellow",
  "orange",
  "red",
  "purple",
  "gray",
] as const);

export type BoardColor = (typeof BOARD_COLORS)[number];
