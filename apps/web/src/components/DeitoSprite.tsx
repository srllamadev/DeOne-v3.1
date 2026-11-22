import { useEffect, useState } from "react";
import type { CSSProperties } from "react";

const sequences = {
  idle: [35, 128, 98, 8, 90, 121],
  greet: [850, 127, 112, 6, 108, 122],
  send: [29, 313, 91, 8, 86, 133],
  receive: [793, 311, 91, 8, 89, 135],
  balance: [27, 518, 104, 6, 102, 127],
  success: [689, 511, 105, 8, 102, 138],
  error: [31, 715, 103, 6, 104, 123],
  loading: [716, 715, 124, 6, 115, 123],
} as const;

export type DeitoAction = keyof typeof sequences;

export function DeitoSprite({ action }: { action: DeitoAction }) {
  const [frame, setFrame] = useState(0);
  const [x, y, step, count, width, height] = sequences[action];

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches) return;
    const loop = action === "idle" || action === "loading";
    let next = 0;
    const timer = window.setInterval(() => {
      next += 1;
      setFrame(loop ? next % count : Math.min(next, count - 1));
      if (!loop && next >= count - 1) window.clearInterval(timer);
    }, action === "idle" ? 290 : 145);
    return () => window.clearInterval(timer);
  }, [action, count]);

  const style: CSSProperties = {
    aspectRatio: width / height,
    backgroundImage: `url("${import.meta.env.BASE_URL}deito/sprites.png")`,
    backgroundSize: `${153600 / width}% ${102400 / height}%`,
    backgroundPosition: `${(x + step * frame) * 100 / (1536 - width)}% ${y * 100 / (1024 - height)}%`,
  };

  return <span className="deito-sprite" style={style} aria-hidden="true" />;
}
