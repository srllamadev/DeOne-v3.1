import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        game: {
          primary: "#1a1a2e",
          secondary: "#16213e",
          accent: "#0f3460",
          highlight: "#e94560",
          gold: "#f5a623",
          silver: "#c0c0c0",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
