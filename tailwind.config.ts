import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Paleta editorial P&B — neutros puros, sem tom quente
        ink: "#0a0a0a",
        sand: "#ffffff",
        paper: "#f5f5f5",
        line: "#e5e5e5",
        muted: "#737373",
        whatsapp: "#25D366",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
