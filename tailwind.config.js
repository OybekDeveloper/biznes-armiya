/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        custom: "0px 6px 58px 0px rgba(196, 203, 214, 0.10)",
        btn_shadow: "0px 6px 12px 0px rgba(63, 140, 255, 0.26)",
      },
      fontFamily: "Arial , san-serif",
      fontSize: "",
      colors: {
        border: "#D8E0F0",
        bg_primary: "#F4F9FD",
        primary: "#3F8CFF",
        text_primary: "#0A1629",
        thin: "#7D8592",
        white: "#FFF",
        black: "#0A1629",
      },
    },
  },
  plugins: [],
};
