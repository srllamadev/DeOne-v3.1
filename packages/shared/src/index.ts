import { z } from "zod";

export const StellarAddressSchema = z
  .string()
  .length(56)
  .regex(/^G[A-Z2-7]{55}$/, "Direccion Stellar invalida");

export type StellarAddress = z.infer<typeof StellarAddressSchema>;

export const RegisterInputSchema = z.object({
  email: z.string().email(),
  username: z.string().min(3).max(30),
  password: z.string().min(8).max(100),
});

export const LoginInputSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const AuthResponseSchema = z.object({
  status: z.literal("ok"),
  user: z.object({
    id: z.string().uuid(),
    email: z.string().email(),
    username: z.string(),
    createdAt: z.coerce.date(),
  }),
  token: z.string(),
});

export type AuthResponse = z.infer<typeof AuthResponseSchema>;

export const UserProfileSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  username: z.string(),
  createdAt: z.coerce.date(),
  profile: z.object({
    level: z.number().int().min(0),
    experience: z.number().int().min(0),
  }).nullable(),
  wallets: z.array(z.object({
    id: z.string().uuid(),
    stellarAddress: z.string(),
    label: z.string().nullable(),
    isDefault: z.boolean(),
  })).optional(),
});

export type UserProfile = z.infer<typeof UserProfileSchema>;

export const WalletBalanceSchema = z.object({
  assetType: z.string(),
  assetCode: z.string().optional(),
  assetIssuer: z.string().optional(),
  balance: z.string(),
});

export type WalletBalance = z.infer<typeof WalletBalanceSchema>;

export const TransactionSchema = z.object({
  id: z.string(),
  hash: z.string(),
  type: z.string(),
  createdAt: z.string(),
  sourceAccount: z.string(),
  memo: z.string().optional(),
});

export type Transaction = z.infer<typeof TransactionSchema>;

export const HealthStatusSchema = z.object({
  status: z.enum(["ok", "error"]),
  timestamp: z.string(),
  version: z.string(),
});

export type HealthStatus = z.infer<typeof HealthStatusSchema>;
