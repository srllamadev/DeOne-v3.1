import { useEffect, useRef } from "react";
import type Phaser from "phaser";
import { createGame } from "@/game/PhaserGame";

export function GameCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    if (!containerRef.current || gameRef.current) return;

    gameRef.current = createGame(containerRef.current);

    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="mx-auto w-full max-w-[800px] rounded-lg overflow-hidden shadow-2xl shadow-game-highlight/20 border border-game-accent"
    />
  );
}
