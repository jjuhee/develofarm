import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{html,js}",
  ],
  theme: {
    extend: {
      keyframes: {
        pulse: {
          "25%": {
            transform: "scale(1.1)",
          },
          "50%": {
            transform: "scale(1)",
            opacity: "1",
          },
          "75%": {
            transform: "scale(.9)",
          },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "main-lime": "#b8ff65",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwind-scrollbar"),
    require("tailwind-scrollbar-hide"),
  ],
}
export default config
