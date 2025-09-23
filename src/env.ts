import { config } from "dotenv";
import { join } from "path";
import { z } from "zod";
 
config({
  path: join(process.cwd(), ".env"),
});

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]).default("production"),
  PORT: z.coerce.number().default(4000),
  HOST: z.string().url(),
});

export const env = envSchema.parse(process.env);
