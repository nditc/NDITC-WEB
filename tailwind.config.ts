import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        ShareTechTown: ["Share Tech Mono", "Mono"],
        Roboto: ["Roboto", "sans-serif"],
        Bebas: ["Bebas Neue", "sans - serif"],
        Nunito: ["Nunito", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwind-gradient-mask-image")],
};
export default config;
