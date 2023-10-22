/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: "#211E46" },
        textColor: { DEFAULT: "#000003" },
        secondary: { DEFAULT: "#6E6189" },
        borderColor: { DEFAULT: "#9C90AA", secondary: "#CBC9CC" },
        background: {
          DEFAULT: "#e9e9ed"
        }
      },
    },
  },
  plugins: [],
};
