import { api } from "@/lib/api";
import type { WalletBalance, Transaction } from "@stellar-game/shared";

export interface WalletInfo {
  id: string;
  stellarAddress: string;
  label: string | null;
  isDefault: boolean;
}

export async function getWallets() {
  return api.get<{ status: string; data: WalletInfo[] }>("/wallets");
}

export async function createWallet(label?: string) {
  return api.post<{ status: string; data: WalletInfo }>("/wallets", { label });
}

export async function getBalances(walletId: string) {
  return api.get<{ status: string; data: WalletBalance[] }>(`/wallets/${walletId}/balances`);
}

export async function getTransactions(walletId: string, limit = 20) {
  return api.get<{ status: string; data: Transaction[] }>(
    `/wallets/${walletId}/transactions?limit=${limit}`,
  );
}

export async function fundWallet(walletId: string) {
  return api.post<{ status: string; data: { hash: string } }>("/wallets/fund", { walletId });
}
