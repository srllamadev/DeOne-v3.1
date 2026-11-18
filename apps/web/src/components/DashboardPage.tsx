import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Wallet, Plus, LogOut, Zap, ChevronRight } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { getMe } from "@/wallet/services/auth.service";
import { getWallets, createWallet, fundWallet, type WalletInfo } from "@/wallet/services/wallet.service";
import { shortenAddress } from "@stellar-game/stellar";

export function DashboardPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user, clearAuth, isAuthenticated } = useAuthStore();
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isAuthenticated()) navigate("/login");
  }, [isAuthenticated, navigate]);

  const { data: profile } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    enabled: !!user,
  });

  const { data: walletsData, isLoading } = useQuery({
    queryKey: ["wallets"],
    queryFn: getWallets,
  });

  const createWalletMutation = useMutation({
    mutationFn: () => createWallet(),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["wallets"] }),
    onError: (err: Error) => setError(err.message),
  });

  const fundMutation = useMutation({
    mutationFn: (walletId: string) => fundWallet(walletId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wallets"] });
      setError("");
    },
    onError: (err: Error) => setError(err.message),
  });

  const wallets: WalletInfo[] = walletsData?.data ?? [];
  const profileData = profile?.data;

  function handleLogout() {
    clearAuth();
    navigate("/");
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-game-primary to-game-secondary p-4">
      <div className="mx-auto max-w-4xl">
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Wallet className="h-8 w-8 text-game-gold" />
            <div>
              <h1 className="text-xl font-bold text-white">
                {profileData?.username ?? user?.username}
              </h1>
              <p className="text-sm text-gray-400">
                Nivel {profileData?.profile?.level ?? 1} &middot;{" "}
                {profileData?.profile?.experience ?? 0} XP
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-lg border border-game-accent px-4 py-2 text-gray-400 hover:text-white hover:border-game-highlight transition"
          >
            <LogOut className="h-4 w-4" />
            Salir
          </button>
        </header>

        {error && (
          <div className="mb-4 rounded-lg bg-red-900/50 border border-red-700 p-3 text-sm text-red-300">
            {error}
          </div>
        )}

        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Mis Wallets</h2>
            <button
              onClick={() => createWalletMutation.mutate()}
              disabled={createWalletMutation.isPending}
              className="flex items-center gap-2 rounded-lg bg-game-highlight px-4 py-2 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50"
            >
              <Plus className="h-4 w-4" />
              Nueva Wallet
            </button>
          </div>

          {isLoading ? (
            <div className="text-center py-12 text-gray-400">Cargando wallets...</div>
          ) : wallets.length === 0 ? (
            <div className="rounded-xl border border-game-accent bg-game-secondary/50 p-8 text-center">
              <Wallet className="mx-auto h-12 w-12 text-gray-500 mb-3" />
              <p className="text-gray-400 mb-4">No tienes wallets todavia</p>
              <button
                onClick={() => createWalletMutation.mutate()}
                className="rounded-lg bg-game-accent px-4 py-2 text-sm text-white hover:bg-game-highlight transition"
              >
                Crear primera wallet
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {wallets.map((wallet) => (
                <Link
                  key={wallet.id}
                  to={`/wallets/${wallet.id}`}
                  className="block rounded-xl border border-game-accent bg-game-secondary/50 p-4 hover:border-game-highlight transition"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-mono text-sm text-white">
                        {shortenAddress(wallet.stellarAddress, 8)}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {wallet.label ?? "Sin etiqueta"}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          fundMutation.mutate(wallet.id);
                        }}
                        disabled={fundMutation.isPending}
                        className="flex items-center gap-1 rounded-lg bg-game-accent px-3 py-1.5 text-xs text-game-gold hover:bg-game-gold hover:text-game-primary transition"
                        title="Fondear con testnet"
                      >
                        <Zap className="h-3 w-3" />
                        Fondear
                      </button>
                      <ChevronRight className="h-5 w-5 text-gray-500" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
