/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        dark: {
          bg: "#0f0f11",
          panel: "#1a1a1e",
          border: "#2a2a30",
          text: "#f3f4f6",
          muted: "#9ca3af",
        },
        brand: {
          primary: "#8b5cf6", // Violet
          hover: "#7c3aed",
          glow: "rgba(139, 92, 246, 0.5)",
        },
      },
      animation: {
        "pulse-glow": "pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-in": "fade-in 0.5s ease-out forwards",
        "slide-up": "slide-up 0.5s ease-out forwards",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": {
            opacity: "1",
            boxShadow: "0 0 15px rgba(139, 92, 246, 0.4)",
          },
          "50%": {
            opacity: "0.8",
            boxShadow: "0 0 5px rgba(139, 92, 246, 0.2)",
          },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
