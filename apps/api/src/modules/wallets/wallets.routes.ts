import { Router } from "express";
import { prisma } from "../../services/prisma.js";
import { authMiddleware, type AuthRequest } from "../../middleware/auth.js";
import * as walletService from "./wallets.service.js";
import { createWalletSchema } from "./wallets.schema.js";
import { AppError } from "../../middleware/errorHandler.js";

const router = Router();

router.post(
  "/wallets",
  authMiddleware,
  async (req: AuthRequest, res, next) => {
    try {
      const { label } = createWalletSchema.parse(req.body);
      const wallet = walletService.generateWallet();

      const dbWallet = await prisma.wallet.create({
        data: {
          userId: req.userId!,
          stellarAddress: wallet.publicKey,
          label: label ?? null,
          isDefault: false,
        },
      });

      res.status(201).json({
        status: "ok",
        data: {
          id: dbWallet.id,
          stellarAddress: dbWallet.stellarAddress,
          label: dbWallet.label,
          isDefault: dbWallet.isDefault,
        },
      });
    } catch (err) {
      next(err);
    }
  },
);

router.get(
  "/wallets",
  authMiddleware,
  async (req: AuthRequest, res, next) => {
    try {
      const wallets = await prisma.wallet.findMany({
        where: { userId: req.userId! },
        select: { id: true, stellarAddress: true, label: true, isDefault: true, createdAt: true },
      });
      res.json({ status: "ok", data: wallets });
    } catch (err) {
      next(err);
    }
  },
);

router.get(
  "/wallets/:id/balances",
  authMiddleware,
  async (req: AuthRequest, res, next) => {
    try {
      const walletId = String(req.params.id ?? "");
      if (!walletId) throw new AppError("ID de wallet requerido", 400);

      const wallet = await prisma.wallet.findFirst({
        where: { id: walletId, userId: req.userId! },
      });

      if (!wallet) {
        throw new AppError("Wallet no encontrada", 404);
      }

      const balances = await walletService.getBalances(wallet.stellarAddress);
      res.json({ status: "ok", data: balances });
    } catch (err) {
      next(err);
    }
  },
);

router.get(
  "/wallets/:id/transactions",
  authMiddleware,
  async (req: AuthRequest, res, next) => {
    try {
      const walletId = String(req.params.id ?? "");
      if (!walletId) throw new AppError("ID de wallet requerido", 400);

      const wallet = await prisma.wallet.findFirst({
        where: { id: walletId, userId: req.userId! },
      });

      if (!wallet) {
        throw new AppError("Wallet no encontrada", 404);
      }

      const limit = Math.min(Number(req.query.limit) || 20, 100);
      const transactions = await walletService.getTransactionHistory(
        wallet.stellarAddress,
        limit,
      );
      res.json({ status: "ok", data: transactions });
    } catch (err) {
      next(err);
    }
  },
);

router.post(
  "/wallets/fund",
  authMiddleware,
  async (req: AuthRequest, res, next) => {
    try {
      const { walletId } = req.body as { walletId: string };
      if (!walletId) throw new AppError("walletId requerido", 400);

      const wallet = await prisma.wallet.findFirst({
        where: { id: walletId, userId: req.userId! },
      });

      if (!wallet) {
        throw new AppError("Wallet no encontrada", 404);
      }

      const hash = await walletService.fundTestnet(wallet.stellarAddress);
      res.json({ status: "ok", data: { hash } });
    } catch (err) {
      next(err);
    }
  },
);

router.post(
  "/wallets/send",
  authMiddleware,
  async (_req: AuthRequest, _res, next) => {
    try {
      throw new AppError(
        "El envio requiere la clave secreta. Esta operacion debe realizarse desde el cliente.",
        400,
      );
    } catch (err) {
      next(err);
    }
  },
);

export default router;
