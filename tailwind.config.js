/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        blob: {
          "0%,100%": { transform: "translate(-50%, -50%) scale(1)" },
          "33%":     { transform: "translate(-40%, -60%) scale(1.1)" },
          "66%":     { transform: "translate(-60%, -40%) scale(0.9)" },
        },
      },
      animation: {
        blob: "blob var(--blob-duration,30s) linear infinite",
      },
    },
  },
};
