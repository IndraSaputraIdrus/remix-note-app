import type { Config } from "tailwindcss";
import { gray } from "tailwindcss/colors";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
      },
      colors: {
        primary: gray[100],
        secondary: gray[400],
        border: gray[800],
        neutral: gray[950],
      },
    },
  },
  plugins: [],
} satisfies Config;
