import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { StrKey } from "@stellar/stellar-sdk";
import { ArrowLeft, Send } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { z } from "zod";
import { getWallets } from "@/wallet/services/wallet.service";
import { WalletMascotTip } from "@/components/WalletMascotTip";

const sendSchema = z.object({
  destination: z.string().trim().refine(StrKey.isValidEd25519PublicKey, "Ingresa una dirección pública válida de Stellar."),
  amount: z.string().trim().transform((amount) => amount.replace(",", ".")).pipe(
    z.string().regex(/^\d{1,12}(\.\d{1,7})?$/, "Ingresa un monto con hasta 7 decimales.")
      .refine((amount) => Number(amount) > 0, "El monto debe ser mayor que cero.")
      .refine((amount) => {
        const [whole, fraction = ""] = amount.split(".");
        return /^\d{1,12}(\.\d{1,7})?$/.test(amount) &&
          BigInt(whole + fraction.padEnd(7, "0")) <= BigInt("9223372036854775807");
      }, "El monto supera el límite de Stellar."),
  ),
});

type Payment = z.infer<typeof sendSchema>;

const fieldClass = "mt-2 w-full rounded-lg border border-game-accent bg-game-primary px-3 py-2 text-white";
const primaryClass = "rounded-lg bg-game-highlight px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50";

export function WalletSendPage() {
  const { id } = useParams<{ id: string }>();
  const [payment, setPayment] = useState<Payment>();
  const wallets = useQuery({ queryKey: ["wallets"], queryFn: getWallets });
  const wallet = wallets.data?.data.find((entry) => entry.id === id);
  const { register, handleSubmit, formState: { errors } } = useForm<Payment>({
    resolver: zodResolver(sendSchema),
    defaultValues: { destination: "", amount: "" },
  });

  return (
    <main className="min-h-screen w-full bg-gradient-to-b from-game-primary to-game-secondary p-4">
      <div className="mx-auto max-w-xl">
        <Link to={wallet ? `/wallets/${wallet.id}` : "/dashboard"} className="mb-6 inline-flex items-center gap-2 text-gray-300 hover:text-white">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          {wallet ? "Volver a la billetera" : "Volver al panel"}
        </Link>

        <section className="rounded-xl border border-game-accent bg-game-secondary/80 p-5 sm:p-8">
          <header className="mb-5 space-y-3">
            <div>
              <span className="text-sm font-semibold text-game-gold">Stellar Testnet</span>
              <h1 className="mt-1 flex items-center gap-2 text-xl font-bold text-white">
                <Send className="h-5 w-5 shrink-0" aria-hidden="true" />
                {payment ? "Revisar envío" : "Enviar XLM"}
              </h1>
            </div>
            <WalletMascotTip
              key={payment ? "review" : "send"}
              message={payment
                ? "¿Coinciden el destino y el monto? Si algo está mal, toca Editar datos."
                : "Pega la dirección de quien recibirá los XLM e indica cuánto quieres enviar. Podrás revisar los datos antes de confirmar."}
            />
          </header>

          {!wallet ? (
            <p role="status" className="text-gray-300">
              {wallets.isPending ? "Cargando billetera…" : "No se pudo acceder a esta billetera."}
            </p>
          ) : payment ? (
            <>
              <dl className="space-y-3 rounded-lg bg-game-primary p-4 text-sm text-white">
                <div><dt className="text-gray-400">Desde</dt><dd className="break-all font-mono">{wallet.stellarAddress}</dd></div>
                <div><dt className="text-gray-400">Destino</dt><dd className="break-all font-mono">{payment.destination}</dd></div>
                <div><dt className="text-gray-400">Monto</dt><dd>{payment.amount} XLM</dd></div>
              </dl>
              <p className="my-4 text-sm text-amber-200">La firma desde el navegador aún está pendiente. El envío está deshabilitado.</p>
              <div className="flex flex-wrap gap-3">
                <button type="button" onClick={() => setPayment(undefined)} className="rounded-lg border border-game-accent px-4 py-2 text-sm text-white">
                  Editar datos
                </button>
                <button type="button" disabled className={primaryClass}>Confirmar envío</button>
              </div>
            </>
          ) : (
            <form onSubmit={handleSubmit((data) => setPayment(data))} noValidate className="space-y-5">
              <div>
                <label htmlFor="destination" className="text-sm font-semibold text-white">Dirección de destino</label>
                <input id="destination" {...register("destination")} autoComplete="off" spellCheck={false} aria-invalid={!!errors.destination} aria-describedby={errors.destination ? "destination-error" : undefined} className={fieldClass} />
                {errors.destination && <p id="destination-error" role="alert" className="mt-1 text-sm text-red-300">{errors.destination.message}</p>}
              </div>
              <div>
                <label htmlFor="amount" className="text-sm font-semibold text-white">Monto en XLM</label>
                <input id="amount" {...register("amount")} inputMode="decimal" placeholder="0.00" aria-invalid={!!errors.amount} aria-describedby={errors.amount ? "amount-error" : undefined} className={fieldClass} />
                {errors.amount && <p id="amount-error" role="alert" className="mt-1 text-sm text-red-300">{errors.amount.message}</p>}
              </div>
              <button type="submit" className={primaryClass}>Revisar envío</button>
            </form>
          )}
        </section>
      </div>
    </main>
  );
}
