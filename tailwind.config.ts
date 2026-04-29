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
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        highlight: "var(--highlight)",
        da: {
          bg: "#264028",
          mid: "#5A735A",
          slate: "#808C89",
          light: "#FEFBEC",
          brown: "#8C6B4D"
        }
      },
    },
  },
  plugins: [],
};
export default config;
