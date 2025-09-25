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

  SWAGGER_PATH: z.string().default("/docs"),
  SWAGGER_USERNAME: z.string().default("admin"),
  SWAGGER_PASSWORD: z.string().default("admin"),

  DATABASE_URL: z
    .string({
      invalid_type_error: "DATABASE_URL must be a string",
      required_error: "Missing DATABASE_URL in environment variables",
    })
    .url(),
});

export const env = envSchema.parse(process.env);
