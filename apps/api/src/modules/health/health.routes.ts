import { Router } from "express";
import { HealthStatusSchema } from "@stellar-game/shared";

const router = Router();

router.get("/health", (_req, res) => {
  const response = HealthStatusSchema.parse({
    status: "ok",
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version ?? "0.1.0",
  });
  res.json(response);
});

export default router;
