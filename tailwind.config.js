import colors from "tailwindcss/colors";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js" 
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f5fbea",
          100: "#e8f6d1",
          200: "#d1eda9",
          300: "#b3df77",
          400: "#96cf4c",
          500: "#77b42e",
          600: "#5c8f21",
          700: "#466d1d",
          800: "#3b581c",
          900: "#324b1c",
          950: "#18290a",
        },
        secondary: {
          50: colors.gray[50],
          100: colors.gray[100],
          200: colors.gray[200],
          300: colors.gray[300],
          400: colors.gray[400],
          500: colors.gray[500],
          600: colors.gray[600],
          700: colors.gray[700],
          800: colors.gray[800],
          900: colors.gray[900],
          950: colors.gray[950],
        },
      },
      keyframes: {
        fadeIn: {
          from: {
            opacity: "0",
          },
          to: {
            opacity: "1",
          },
        },
        fadeOut: {
          from: {
            opacity: "1",
          },
          to: {
            opacity: "0",
          },
        },
        scaleIn: {
          from: {
            opacity: "0",
            scale: "0.8",
          },
          to: {
            scale: "1",
            opacity: "1",
          },
        },
        scaleOut: {
          from: {
            opacity: "1",
          },
          to: {
            opacity: "0",
            scale: "0.8",
          },
        },
        slideIn: {
          from: {
            opacity: "0",
            transform: "translateY(-10px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        slideOut: {
          from: {
            opacity: "1",
            transform: "translateY(0)",
          },
          to: {
            opacity: "0",
            transform: "translateY(-10px)",
          },
        },
      },
      animation: {
        "fade-in": "fadeIn 0.25s ease-out",
        "fade-out": "fadeOut 0.2s ease-in",
        "scale-in": "scaleIn 0.25s ease-out",
        "scale-out": "scaleOut 0.20s ease-in",
        "slide-in": "slideIn 0.25s ease-out",
        "slide-out": "slideOut 0.25s ease-in",
      },
    },
    fontFamily: {
      body: ["Noto Serif Lao"],
      sans: ["Noto Serif Lao", "sans-serif"],
    },
  },
  plugins: [
    require('flowbite/plugin') 
  ],
}

