import { z } from "zod";

export const envSchema = z.object({
  JWT_SECRET: z.string(),
  PORT: z.coerce.number().optional().default(3333),
  DATABASE_URL: z.string().url(),
});

export type Env = z.infer<typeof envSchema>;
