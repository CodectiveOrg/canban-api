import { z } from "zod";

export const UsernameSchema = z
  .string()
  .min(3, "Username must be more than 3 characters long.")
  .max(32, "Username must be less than 32 characters long.");
