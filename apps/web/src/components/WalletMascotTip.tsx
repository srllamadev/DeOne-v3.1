import { Lightbulb } from "lucide-react";

export function WalletMascotTip({ message, celebration = 0 }: {
  message: string;
  celebration?: number;
}) {
  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <img
        key={celebration}
        src={`${import.meta.env.BASE_URL}deone-recibir.png`}
        alt=""
        width={1536}
        height={1024}
        className={`h-16 w-20 shrink-0 object-contain sm:h-20 sm:w-28 ${
          celebration ? "wallet-mascot-celebrate" : "wallet-mascot-enter"
        }`}
      />
      <p className="relative flex items-start gap-2 rounded-xl bg-emerald-100 px-3 py-2 text-sm leading-relaxed text-emerald-950 before:absolute before:-left-1.5 before:top-1/2 before:h-3 before:w-3 before:-translate-y-1/2 before:rotate-45 before:bg-emerald-100 before:content-['']">
        <Lightbulb className="relative mt-0.5 h-4 w-4 shrink-0 text-emerald-800" aria-hidden="true" />
        <span className="relative">{message}</span>
      </p>
    </div>
  );
}
