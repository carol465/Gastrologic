import { z } from "zod";

export const recommendSchema = z.object({
  ingredients: z.array(z.string().min(1)).min(1),
  profile: z.enum(["balanced", "high_protein", "low_carb"]).default("balanced"),
  maxResults: z.number().int().min(1).max(50).default(10),
});