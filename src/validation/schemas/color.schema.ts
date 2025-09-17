import { z } from "zod";

import { BOARD_COLORS } from "@/types/board-color.type";

export const ColorSchema = z.enum(
  BOARD_COLORS,
  "Color must be one of the specified options.",
);
