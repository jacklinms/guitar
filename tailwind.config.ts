import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // 深色基底 + 吉他風格藍/橙/金
        dark: {
          950: "#0a0a0c",
          900: "#121214",
          800: "#1a1a1e",
          700: "#242428",
          600: "#2e2e34",
        },
        accent: {
          gold: "#d4af37",
          "gold-light": "#e8c547",
          blue: "#3b82f6",
          "blue-dark": "#2563eb",
          orange: "#f97316",
          "orange-dark": "#ea580c",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 20px rgba(212, 175, 55, 0.15)",
        "glow-blue": "0 0 20px rgba(59, 130, 246, 0.2)",
      },
    },
  },
  plugins: [],
};

export default config;
