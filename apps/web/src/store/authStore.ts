import { create } from "zustand";

interface AuthState {
  token: string | null;
  user: { id: string; email: string; username: string } | null;
  setAuth: (token: string, user: { id: string; email: string; username: string }) => void;
  clearAuth: () => void;
  isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  token: null,
  user: null,

  setAuth: (token, user) => {
    localStorage.setItem("sgw_token", token);
    localStorage.setItem("sgw_user", JSON.stringify(user));
    set({ token, user });
  },

  clearAuth: () => {
    localStorage.removeItem("sgw_token");
    localStorage.removeItem("sgw_user");
    set({ token: null, user: null });
  },

  isAuthenticated: () => {
    const state = get();
    if (state.token) return true;
    const stored = localStorage.getItem("sgw_token");
    if (stored) {
      const user = JSON.parse(localStorage.getItem("sgw_user") ?? "null");
      set({ token: stored, user });
      return true;
    }
    return false;
  },
}));
