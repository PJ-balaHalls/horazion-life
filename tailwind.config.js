// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  // CORREÇÃO CRÍTICA: Adicionado "./app/**/*.{ts,tsx}" para ler as telas do Expo Router
  content: ["./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        surface: {
          base: "var(--hz-surface-base)",
          elevated: "var(--hz-surface-elev)",
          sunken: "var(--hz-surface-sunken)",
        },
        content: {
          primary: "var(--hz-content-primary)",
          secondary: "var(--hz-content-second)",
          action: "var(--hz-content-action)",
        },
        status: {
          success: "var(--hz-status-success)",
          warning: "var(--hz-status-warning)",
          danger: "var(--hz-status-danger)",
        },
      },
      borderRadius: {
        hz: "12px",
      },
      spacing: {
        "hz-unit": "4px",
        "component-p": "16px",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        dyslexia: ["OpenDyslexic", "sans-serif"],
      },
    },
  },
  plugins: [],
};
