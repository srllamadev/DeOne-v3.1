import { Router } from "express";
import * as authService from "./auth.service.js";
import { authMiddleware, type AuthRequest } from "../../middleware/auth.js";
import { registerSchema, loginSchema } from "./users.schema.js";

const router = Router();

router.post("/auth/register", async (req, res, next) => {
  try {
    const data = registerSchema.parse(req.body);
    const result = await authService.register(data.email, data.username, data.password);
    res.status(201).json({ status: "ok", ...result });
  } catch (err) {
    next(err);
  }
});

router.post("/auth/login", async (req, res, next) => {
  try {
    const data = loginSchema.parse(req.body);
    const result = await authService.login(data.email, data.password);
    res.json({ status: "ok", ...result });
  } catch (err) {
    next(err);
  }
});

router.get("/auth/me", authMiddleware, async (req: AuthRequest, res, next) => {
  try {
    const user = await authService.getUserById(req.userId!);
    res.json({ status: "ok", data: user });
  } catch (err) {
    next(err);
  }
});

export default router;
