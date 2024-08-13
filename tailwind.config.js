/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        custom: "0px 6px 58px 0px rgba(196, 203, 214, 0.10)",
        btn_shadow: "0px 6px 12px 0px rgba(63, 140, 255, 0.1)",
      },
      fontFamily: "Arial , san-serif",
      fontSize: "",
      // colors: {
      //asked:"#3498DB",
      // },
      colors: {
        asked: {
          DEFAULT: "#3498DB",
          hover: "#2980B9",
        },
        expected: {
          DEFAULT: "#E67E22",
          hover: "#D35400",
        },
        finished: {
          DEFAULT: "#2ECC71",
          hover: "#27AE60",
        },
        done: {
          DEFAULT: "#9B59B6",
          hover: "#8E44AD",
        },
        primary: "rgba(var(--primary))",
        "hover-card": "rgba(var(--hover-card))",
        "active-card": "rgba(var(--active-card))",
        background: "rgba(var(--background))",
        "background-secondary": "rgba(var(--background-secondary))",
        "text-primary": "rgba(var(--text-primary))",
        "thin-color": "rgba(var(--thin-color))",
        border: "rgba(var(--border))",
        card: "rgba(var(--card))",
        "copy-primary": "rgba(var(--copy-primary))",
        "copy-secondary": "rgba(var(--copy-secondary))",
        cta: "rgba(var(--cta))",
        "cta-active": "rgba(var(--cta-active))",
        "cta-text": "rgba(var(--cta-text))",

        "button-color": "rgba(var(--button-color))",
        "hr-color": "rgba(var(--hr-color))",
        grape: "rgba(var(--grape))",
      },
    },
  },
  plugins: [],
};
