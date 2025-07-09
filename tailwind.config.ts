import type { Config } from "tailwindcss";
const { heroui } = require("@heroui/theme");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        "underline-color": "#yourColor",
        white: "#FFFFFF",

        gray50: "#F9F9F9",
        gray100: "#EEEEEE",
        gray200: "#ECECEC",
        gray300: "#C1C1C1",
        gray400: "#686868",
        gray500: "#282828",
        gray600: "#999",

        red: "#F05454",
        yellow: "#F5B461",
        green: "#9BDEAC",
        blue: "#66BFBF",
        lightgreen: "#F2FDFB",
        brand: {
          light1: "#d5e4e9",
          light2: "#cad9de",
          main: "#134865", // Logo color
          light3: "#b6c7cc",
        },
      },
      backgroundImage: {
        "header-gradient": "linear-gradient(90deg, #d5e4e9, #cad9de)",
      },
    },
  },
  variants: {
    extend: {
      transform: ["group-hover"],
      scale: ["group-hover"],
      transitionDuration: ["group-hover"],
      letterSpacing: ["group-hover"],
      width: ["group-hover"],
      borderColor: ["group-hover"],
    },
    // divideColor: ['group-hover'],
  },
  plugins: [heroui(), require("@tailwindcss/typography")],
};
export default config;
