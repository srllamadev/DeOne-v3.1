import { z } from "zod";

export const sendPaymentSchema = z.object({
  fromWalletId: z.string().uuid(),
  toPublicKey: z.string().length(56).regex(/^G[A-Z2-7]{55}$/),
  amount: z.string().regex(/^\d+(\.\d+)?$/),
  asset: z.string().default("XLM"),
  memo: z.string().max(28).optional(),
});

export const createWalletSchema = z.object({
  label: z.string().max(50).optional(),
});
