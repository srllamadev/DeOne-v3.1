import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Copy, ExternalLink, Coins, ArrowDownUp } from "lucide-react";
import { getBalances, getTransactions } from "@/wallet/services/wallet.service";
import { shortenAddress } from "@stellar-game/stellar";
import { useState } from "react";

export function WalletDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const { data: balancesData, isLoading: loadingBalances } = useQuery({
    queryKey: ["balances", id],
    queryFn: () => getBalances(id!),
    enabled: !!id,
  });

  const { data: txData, isLoading: loadingTx } = useQuery({
    queryKey: ["transactions", id],
    queryFn: () => getTransactions(id!, 30),
    enabled: !!id,
  });

  const balances = balancesData?.data ?? [];
  const transactions = txData?.data ?? [];

  function copyAddress() {
    const wallet = balancesData?.data;
    if (!wallet) return;
    navigator.clipboard.writeText(id ?? "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-game-primary to-game-secondary p-4">
      <div className="mx-auto max-w-4xl">
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al dashboard
        </button>

        <div className="rounded-xl border border-game-accent bg-game-secondary/50 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold text-white">Detalle de Wallet</h1>
            <button
              onClick={copyAddress}
              className="flex items-center gap-2 rounded-lg bg-game-accent px-3 py-1.5 text-sm text-gray-300 hover:text-white transition"
            >
              <Copy className="h-4 w-4" />
              {copied ? "Copiada!" : "Copiar direccion"}
            </button>
          </div>
          <p className="font-mono text-sm text-game-gold break-all">{id}</p>
        </div>

        <section className="mb-6">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-white mb-4">
            <Coins className="h-5 w-5 text-game-gold" />
            Saldos
          </h2>

          {loadingBalances ? (
            <div className="text-center py-8 text-gray-400">Consultando red Stellar...</div>
          ) : balances.length === 0 ? (
            <div className="rounded-xl border border-game-accent bg-game-secondary/50 p-6 text-center text-gray-400">
              Sin saldos. Fondea tu wallet desde el dashboard (Testnet).
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              {balances.map((b, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-game-accent bg-game-secondary/50 p-4"
                >
                  <p className="text-2xl font-bold text-white">{b.balance}</p>
                  <p className="text-sm text-gray-400">
                    {b.assetCode ?? (b.assetType === "native" ? "XLM" : b.assetType)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        <section>
          <h2 className="flex items-center gap-2 text-lg font-semibold text-white mb-4">
            <ArrowDownUp className="h-5 w-5 text-game-highlight" />
            Transacciones
          </h2>

          {loadingTx ? (
            <div className="text-center py-8 text-gray-400">Cargando historial...</div>
          ) : transactions.length === 0 ? (
            <div className="rounded-xl border border-game-accent bg-game-secondary/50 p-6 text-center text-gray-400">
              Sin transacciones.
            </div>
          ) : (
            <div className="space-y-2">
              {transactions.map((tx) => (
                <div
                  key={tx.id}
                  className="flex items-center justify-between rounded-lg border border-game-accent bg-game-secondary/50 px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-semibold text-white capitalize">{tx.type}</p>
                    <p className="text-xs text-gray-500 font-mono">
                      {shortenAddress(tx.sourceAccount)}
                    </p>
                  </div>
                  <a
                    href={`https://stellar.expert/explorer/testnet/tx/${tx.hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-game-gold transition"
                    title="Ver en Stellar Expert"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
