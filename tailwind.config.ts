const { nextui } = require("@nextui-org/react")
import { url } from 'inspector';
import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
      "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xsm: '365px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',

        sectorsBG: 'url("/Sectors.png")',
      },
       colors: {
        primary: "#279367",
        primary_dark: "#176346",
        primary_darkest: "#1d2121",
        secondary: "#2cb87e",
        secondary_light: "#53f295",
        secondary_lighter: "#D1FFD9",
        secondary_lightest: "#e6faea",
      },
      fontFamily: {
        ShareTechTown: ['Share Tech Mono', 'Mono'],
        Roboto: ['Roboto', 'sans-serif'],
        Bebas: ['Bebas Neue', 'sans - serif'],
        Nunito: ['Nunito', 'sans-serif'],
      },
    },
  },
  darkMode: "class",
  plugins: [
    require('tailwind-gradient-mask-image'),
    plugin(({ matchUtilities, theme }) => {
      matchUtilities({
        // Class name
        'grid-fluid-fit': (value) => {
          return {
            gridTemplateColumns: 'repeat(auto-fit, minmax(' + value + ', 1fr))', // Desired CSS properties here
            display: 'grid', // Just for example non-dynamic value
          };
        },
        'grid-fluid-fill': (value) => {
          return {
            gridTemplateColumns: 'repeat(auto-fill, minmax(' + value + ', 1fr))', // Desired CSS properties here
            display: 'grid', // Just for example non-dynamic value
          };
        },
      });
    }),
     plugin(({ matchUtilities, theme }) => {
      matchUtilities({
        // Class name
        "grid-fluid-fit": (value) => {
          return {
            gridTemplateColumns: "repeat(auto-fit, minmax(" + value + ", 1fr))", // Desired CSS properties here
            display: "grid", // Just for example non-dynamic value
          };
        },
        "grid-fluid-fill": (value) => {
          return {
            gridTemplateColumns:
              "repeat(auto-fill, minmax(" + value + ", 1fr))", // Desired CSS properties here
            display: "grid", // Just for example non-dynamic value
          };
        },
      });
    }),

    nextui({
      themes: {
        dark: {
          colors: {
            primary: "#279367",
            primary_dark: "#176346",
            primary_darkest: "#1d2121",
            secondary: "#2cb87e",
            secondary_light: "#53f295",
            secondary_lighter: "#D1FFD9",
            secondary_lightest: "#e6faea",
          },
        },
      },
    }),
  ],
};
export default config;
