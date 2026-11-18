import { api } from "@/lib/api";
import type { AuthResponse, UserProfile } from "@stellar-game/shared";

export async function register(email: string, username: string, password: string) {
  return api.post<AuthResponse>("/auth/register", { email, username, password });
}

export async function login(email: string, password: string) {
  return api.post<AuthResponse>("/auth/login", { email, password });
}

export async function getMe() {
  return api.get<{ status: string; data: UserProfile }>("/auth/me");
}
