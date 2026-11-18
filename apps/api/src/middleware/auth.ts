import type { Request, Response, NextFunction } from "express";
import { jwtVerify } from "jose";
import { loadEnv } from "../config/env.js";

export interface AuthRequest extends Request {
  userId?: string;
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  const header = req.headers.authorization;

  if (!header?.startsWith("Bearer ")) {
    res.status(401).json({ status: "error", message: "Token requerido" });
    return;
  }

  const token = header.slice(7);
  const env = loadEnv();
  const secret = new TextEncoder().encode(env.JWT_SECRET);

  jwtVerify(token, secret)
    .then(({ payload }) => {
      req.userId = payload.sub as string;
      next();
    })
    .catch(() => {
      res.status(401).json({ status: "error", message: "Token invalido o expirado" });
    });
}
