import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#FAFAF7",
        panel: "#FFFFFF",
        "panel-raised": "#F2F0EB",
        line: "#E5E0D6",
        gold: {
          DEFAULT: "#C9A227",
          bright: "#E8C468",
          dim: "#8A6F26",
        },
        ivory: "#1A1612",
        muted: "#6B6560",
        verdigris: "#6B8F7C",
        rust: "#B5623A",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-plex-mono)", "monospace"],
      },
      backgroundImage: {
        "hairline-grid":
          "linear-gradient(rgba(201,162,39,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(201,162,39,0.06) 1px, transparent 1px)",
      },
      letterSpacing: {
        widest2: "0.28em",
      },
    },
  },
  plugins: [],
};

export default config;
