import { GAME_CONFIG } from "@stellar-game/game-config";
import { Wallet } from "lucide-react";

export function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-game-primary to-game-secondary p-8">
      <div className="flex flex-col items-center gap-6 text-center">
        <div className="rounded-full bg-game-accent p-6 shadow-lg shadow-game-highlight/20">
          <Wallet className="h-16 w-16 text-game-gold" />
        </div>
        <h1 className="text-5xl font-bold tracking-tight text-white">
          {GAME_CONFIG.APP_TITLE}
        </h1>
        <p className="max-w-md text-lg text-gray-300">
          Billetera digital gamificada sobre la red Stellar
        </p>
        <div className="mt-4 rounded-lg border border-game-accent bg-game-accent/50 px-6 py-3">
          <p className="text-sm text-gray-400">
            Versi&oacute;n {GAME_CONFIG.VERSION} &middot; Infraestructura inicial
          </p>
        </div>
      </div>
    </main>
  );
}
