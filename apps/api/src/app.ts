import express from "express";
import cors from "cors";
import helmet from "helmet";
import { errorHandler } from "./middleware/errorHandler.js";
import healthRoutes from "./modules/health/health.routes.js";
import authRoutes from "./modules/users/auth.routes.js";
import walletRoutes from "./modules/wallets/wallets.routes.js";

export function createApp() {
  const app = express();

  app.use(helmet());
  app.use(cors());
  app.use(express.json());

  app.use(healthRoutes);
  app.use(authRoutes);
  app.use(walletRoutes);

  app.get("/", (_req, res) => {
    res.json({ name: "Stellar Game Wallet API", status: "running" });
  });

  app.use(errorHandler);

  return app;
}
