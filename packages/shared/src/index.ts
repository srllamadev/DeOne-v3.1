import { z } from "zod";

export const StellarAddressSchema = z
  .string()
  .length(56)
  .regex(/^G[A-Z2-7]{55}$/, "Dirección Stellar inválida");

export type StellarAddress = z.infer<typeof StellarAddressSchema>;

export const UserProfileSchema = z.object({
  id: z.string().uuid(),
  username: z.string().min(3).max(30),
  stellarAddress: StellarAddressSchema.nullable(),
  level: z.number().int().min(0).default(1),
  experience: z.number().int().min(0).default(0),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type UserProfile = z.infer<typeof UserProfileSchema>;

export const TransactionSchema = z.object({
  hash: z.string(),
  from: StellarAddressSchema,
  to: StellarAddressSchema,
  amount: z.string(),
  asset: z.string().default("XLM"),
  memo: z.string().optional(),
  createdAt: z.date(),
});

export type Transaction = z.infer<typeof TransactionSchema>;

export const HealthStatusSchema = z.object({
  status: z.enum(["ok", "error"]),
  timestamp: z.string(),
  version: z.string(),
});

export type HealthStatus = z.infer<typeof HealthStatusSchema>;
