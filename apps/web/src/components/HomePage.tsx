import { GAME_CONFIG } from "@stellar-game/game-config";
import { Wallet, Gamepad2 } from "lucide-react";
import { GameCanvas } from "@/components/GameCanvas";

export function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-game-primary to-game-secondary p-4">
      <div className="flex flex-col items-center gap-6 text-center mb-8">
        <div className="flex items-center gap-3 rounded-full bg-game-accent p-4 shadow-lg shadow-game-highlight/20">
          <Wallet className="h-10 w-10 text-game-gold" />
          <Gamepad2 className="h-10 w-10 text-game-highlight" />
        </div>
        <h1 className="text-5xl font-bold tracking-tight text-white">
          {GAME_CONFIG.APP_TITLE}
        </h1>
        <p className="max-w-md text-lg text-gray-300">
          Billetera digital gamificada sobre la red Stellar
        </p>
      </div>

      <GameCanvas />

      <div className="mt-8 flex gap-4">
        <a
          href="/login"
          className="rounded-lg bg-game-accent px-6 py-3 font-semibold text-white transition hover:bg-game-highlight"
        >
          Iniciar sesion
        </a>
        <a
          href="/register"
          className="rounded-lg border border-game-accent px-6 py-3 font-semibold text-gray-300 transition hover:bg-game-accent hover:text-white"
        >
          Registrarse
        </a>
      </div>
    </main>
  );
}
