import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.coerce.number().int().positive().default(3001),
  DATABASE_URL: z.string().url(),
  STELLAR_NETWORK: z.enum(["TESTNET", "MAINNET"]).default("TESTNET"),
  STELLAR_HORIZON_URL: z.string().url().default("https://horizon-testnet.stellar.org"),
  STELLAR_SOROBAN_RPC_URL: z.string().url().default("https://soroban-testnet.stellar.org"),
});

export type Env = z.infer<typeof envSchema>;

export function loadEnv(): Env {
  const result = envSchema.safeParse(process.env);
  if (!result.success) {
    console.error("Variables de entorno inválidas:", result.error.format());
    process.exit(1);
  }
  return result.data;
}
