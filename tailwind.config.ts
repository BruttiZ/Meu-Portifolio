import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        void: "#0a0a0a",
        ink: "#0d1117",
        panel: "rgba(13, 17, 23, 0.72)",
        cyanGlow: "#22d3ee",
        violetGlow: "#a78bfa",
        plasma: "#f472b6",
        limePulse: "#a3e635"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"]
      },
      boxShadow: {
        neon: "0 0 26px rgba(34, 211, 238, 0.32)",
        violet: "0 0 32px rgba(167, 139, 250, 0.26)"
      },
      keyframes: {
        gridShift: {
          "0%": { transform: "translate3d(0, 0, 0)" },
          "100%": { transform: "translate3d(-48px, -48px, 0)" }
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" }
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" }
        }
      },
      animation: {
        gridShift: "gridShift 18s linear infinite",
        gradientShift: "gradientShift 12s ease infinite",
        float: "float 5s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;
