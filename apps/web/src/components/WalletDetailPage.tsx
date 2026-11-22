import { Link, useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Copy, ExternalLink, Coins, ArrowDownUp, Send } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { WalletMascotTip } from "@/components/WalletMascotTip";
import { getBalances, getTransactions, getWallets } from "@/wallet/services/wallet.service";
import { shortenAddress } from "@stellar-game/stellar";
import { useState } from "react";

export function WalletDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [copyFeedback, setCopyFeedback] = useState<{
    address: string;
    message: string;
  }>();
  const [copyCount, setCopyCount] = useState(0);

  const walletsQuery = useQuery({
    queryKey: ["wallets"],
    queryFn: getWallets,
    enabled: !!id,
  });
  const address = walletsQuery.data?.data.find((wallet) => wallet.id === id)?.stellarAddress;

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

  async function copyAddress() {
    if (!address) return;

    try {
      await navigator.clipboard.writeText(address);
      setCopyFeedback({ address, message: "Dirección copiada." });
      setCopyCount((count) => count + 1);
    } catch {
      setCopyFeedback({ address, message: "Selecciona la dirección para copiarla manualmente." });
    }
  }

  return (
    <main className="deone-wallet min-h-screen p-4 sm:p-8">
      <div className="mx-auto max-w-4xl">
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 text-emerald-800 hover:text-emerald-950 mb-6 transition"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al inicio
        </button>

        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-xl font-bold text-emerald-950">Detalle de billetera</h1>
          {address && (
            <Link
              to="send"
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-200 px-4 py-2 text-sm font-semibold text-emerald-950"
            >
              <Send className="h-4 w-4" aria-hidden="true" />
              Enviar XLM
            </Link>
          )}
        </div>
        <section className="mb-6 grid overflow-hidden rounded-2xl border border-emerald-200 bg-emerald-50 sm:grid-cols-[minmax(0,1fr)_14rem]">
          <div className="min-w-0 p-5 sm:p-6">
            <h2 className="text-lg font-semibold text-emerald-950">Recibir en Stellar</h2>
            {address ? (
              <>
                <div className="mt-3">
                  <WalletMascotTip
                    message="Comparte tu dirección o deja que la otra persona escanee el QR para enviarte fondos."
                    celebration={copyCount} action="receive"
                  />
                </div>
                <p className="my-4 select-all break-all rounded-lg bg-emerald-100 p-3 font-mono text-sm text-emerald-950">
                  {address}
                </p>
                <button
                  type="button"
                  onClick={copyAddress}
                  className="inline-flex items-center gap-2 rounded-lg bg-emerald-300 px-4 py-2 text-sm font-semibold text-emerald-950 transition hover:bg-emerald-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300"
                >
                  <Copy className="h-4 w-4" aria-hidden="true" />
                  Copiar dirección
                </button>
                <p role="status" className="mt-2 text-sm text-emerald-800">
                  {copyFeedback?.address === address && copyFeedback.message}
                </p>
              </>
            ) : (
              <p role="status" className="mt-2 text-sm text-emerald-800">
                {walletsQuery.isLoading ? "Buscando dirección…" : "No se encontró la dirección de esta billetera."}
              </p>
            )}
          </div>
          {address && (
            <div className="flex items-center justify-center px-5 pb-5 sm:pt-5">
              <figure className="text-center">
                <QRCodeSVG
                  value={address}
                  size={160}
                  level="M"
                  marginSize={4}
                  title="Código QR de la dirección pública Stellar"
                  className="mx-auto rounded-md"
                />
                <figcaption className="mt-2 text-xs text-emerald-800">
                  Escanea para obtener la dirección
                </figcaption>
              </figure>
            </div>
          )}
        </section>

        <section className="mb-6">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-emerald-950 mb-4">
            <Coins className="h-5 w-5 text-emerald-700" />
            Saldos
          </h2>

          {loadingBalances ? (
            <div className="text-center py-8 text-emerald-800">Consultando red Stellar...</div>
          ) : balances.length === 0 ? (
            <div className="rounded-xl border border-emerald-200 bg-white/80 p-6 text-center text-emerald-800">
              Sin saldos. Fondea tu wallet desde el dashboard (Testnet).
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              {balances.map((b, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-emerald-200 bg-white/80 p-4"
                >
                  <p className="text-2xl font-bold text-emerald-950">{b.balance}</p>
                  <p className="text-sm text-emerald-800">
                    {b.assetCode ?? (b.assetType === "native" ? "XLM" : b.assetType)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        <section>
          <h2 className="flex items-center gap-2 text-lg font-semibold text-emerald-950 mb-4">
            <ArrowDownUp className="h-5 w-5 text-emerald-700" />
            Transacciones
          </h2>

          {loadingTx ? (
            <div className="text-center py-8 text-emerald-800">Cargando historial...</div>
          ) : transactions.length === 0 ? (
            <div className="rounded-xl border border-emerald-200 bg-white/80 p-6 text-center text-emerald-800">
              Sin transacciones.
            </div>
          ) : (
            <div className="space-y-2">
              {transactions.map((tx) => (
                <div
                  key={tx.id}
                  className="flex items-center justify-between rounded-lg border border-emerald-200 bg-white/80 px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-semibold text-emerald-950 capitalize">{tx.type}</p>
                    <p className="text-xs text-emerald-800 font-mono">
                      {shortenAddress(tx.sourceAccount)}
                    </p>
                  </div>
                  <a
                    href={`https://stellar.expert/explorer/testnet/tx/${tx.hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-800 hover:text-emerald-700 transition"
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
