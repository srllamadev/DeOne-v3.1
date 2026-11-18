import bcrypt from "bcrypt";
import { SignJWT } from "jose";
import { prisma } from "../../services/prisma.js";
import { loadEnv } from "../../config/env.js";
import { AppError } from "../../middleware/errorHandler.js";

const SALT_ROUNDS = 12;

export async function register(email: string, username: string, password: string) {
  const existing = await prisma.user.findFirst({
    where: { OR: [{ email }, { username }] },
  });

  if (existing) {
    throw new AppError("El email o username ya esta registrado", 409);
  }

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

  const user = await prisma.user.create({
    data: {
      email,
      username,
      passwordHash,
      profile: { create: {} },
    },
    select: {
      id: true,
      email: true,
      username: true,
      createdAt: true,
      profile: true,
    },
  });

  const token = await generateToken(user.id);

  return { user, token };
}

export async function login(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { email },
    include: { profile: true },
  });

  if (!user) {
    throw new AppError("Credenciales invalidas", 401);
  }

  const valid = await bcrypt.compare(password, user.passwordHash);

  if (!valid) {
    throw new AppError("Credenciales invalidas", 401);
  }

  const token = await generateToken(user.id);

  return {
    user: {
      id: user.id,
      email: user.email,
      username: user.username,
      createdAt: user.createdAt,
      profile: user.profile,
    },
    token,
  };
}

export async function getUserById(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      username: true,
      createdAt: true,
      profile: true,
      wallets: {
        select: {
          id: true,
          stellarAddress: true,
          label: true,
          isDefault: true,
        },
      },
    },
  });

  if (!user) {
    throw new AppError("Usuario no encontrado", 404);
  }

  return user;
}

async function generateToken(userId: string) {
  const env = loadEnv();
  const secret = new TextEncoder().encode(env.JWT_SECRET);

  const token = await new SignJWT({ sub: userId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(env.JWT_EXPIRATION)
    .sign(secret);

  return token;
}
