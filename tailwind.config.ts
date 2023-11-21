import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      sans: ["DM Sans", "sans-serif"],
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        DEFAULT: "1280px",
      },
    },
  },
  plugins: [],
};
export default config;
