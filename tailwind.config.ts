import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        pretendard: ["Pretendard", "sans-serif"],
        paperlogy: ["Paperlogy", "sans-serif"],
      },
      fontSize: {
        "title-100": ["40px", { fontWeight: "700" }],
        "title-200": ["32px", { fontWeight: "700" }],
        "title-300": ["24px", { fontWeight: "700" }],
        "title-400": ["20px", { fontWeight: "700" }],
        "title-500": ["16px", { fontWeight: "700" }],
        "title-600": ["14px", { fontWeight: "700" }],
        "text-100": ["20px", { fontWeight: "500" }],
        "text-200": ["18px", { fontWeight: "500" }],
        "text-300": ["16px", { fontWeight: "500" }],
        "text-400": ["14px", { fontWeight: "500" }],
        "text-500": ["12px", { fontWeight: "500" }],
      },

      colors: {
        "primary-0": "#2973B2",
        "sub-color-100": "#48A6A7",
        "sub-color-200": "#F2EFE7",
        "sub-color-300": "#9ACBD0",
        "gray-100": "#101112",
        "gray-200": "#2C2D30",
        "gray-300": "#4C4D51",
        "gray-400": "#6E6F75",
        "gray-500": "#92949A",
        "gray-600": "#B9BABE",
        "gray-700": "#E2E2E4",
        "gray-800": "#F1F1EF",
      },
      boxShadow: {
        "shadow-0": "0px 0px 8px 1px rgba(175, 175, 175, 0.25)",
      },
      borderRadius: {
        lg: "16px",
        md: "12px",
        sm: "6px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
  future: {
    hoverOnlyWhenSupported: true,
  },
  experimental: {
    optimizeUniversalDefaults: true,
  },
};

export default config;
