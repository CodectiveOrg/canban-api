import { z } from "zod";

export const TitleSchema = z
  .string("Title must be a string.")
  .trim()
  .nonempty("Title cannot be empty.");
