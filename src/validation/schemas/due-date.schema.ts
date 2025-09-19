import { z } from "zod";

export const DueDateSchema = z.preprocess(
  (val) => {
    if (typeof val === "string") {
      return val || null;
    }

    return val;
  },
  z
    .string("Due date must be a string.")
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Due date format must be YYYY-MM-DD.")
    .refine(
      (val) => !Number.isNaN(Date.parse(val)),
      "Due date must be a valid date.",
    )
    .nullable(),
);
