import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      "purple--dark": "#BE7FD2",
      "purple--primary": "#ff9ff3",
      "purple--secondary": "#f368e0",
      gray: "#666666",
      lightGray: "#999999",
      veryLightGray: "#F1F1F1",
      white: "#FFFFFF",
      black: "#000000",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        IRANSansWeb: ["IRANSansWeb"],
      },
    },
  },
  plugins: [],
};
export default config;
