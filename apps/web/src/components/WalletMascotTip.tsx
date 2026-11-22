import { Lightbulb } from "lucide-react";
import { DeitoSprite, type DeitoAction } from "./DeitoSprite";

export function WalletMascotTip({ message, celebration = 0, action = "idle" }: {
  message: string;
  celebration?: number;
  action?: DeitoAction;
}) {
  const mood = celebration ? "success" : action;

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <div key={`${mood}-${celebration}`} className="grid w-16 shrink-0 place-items-center rounded-xl bg-white p-1 sm:w-20">
        <DeitoSprite action={mood} />
      </div>
      <p className="relative flex items-start gap-2 rounded-xl bg-emerald-100 px-3 py-2 text-sm leading-relaxed text-emerald-950 before:absolute before:-left-1.5 before:top-1/2 before:-translate-y-1/2 before:rotate-45 before:bg-emerald-100 before:content-['']">
        <Lightbulb className="relative mt-0.5 h-4 w-4 shrink-0 text-emerald-800" aria-hidden="true" />
        <span className="relative">{message}</span>
      </p>
    </div>
  );
}
