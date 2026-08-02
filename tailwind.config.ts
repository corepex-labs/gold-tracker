import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#14110F",
        panel: "#1C1813",
        "panel-raised": "#221D17",
        line: "#3A3024",
        gold: {
          DEFAULT: "#C9A227",
          bright: "#E8C468",
          dim: "#8A6F26",
        },
        ivory: "#F0EAE0",
        muted: "#9C9284",
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
