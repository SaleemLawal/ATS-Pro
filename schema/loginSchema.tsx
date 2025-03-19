import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email().min(2).max(50),
  password: z
    .string()
    .min(4, {
      message: "Minimum of 4 characters",
    })
    .max(16),
});
