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
        primary:  { 
          50: "#EEFFF5",
          100: "#D8FFEB",
          200: "#B4FED8",
          300: "#79FCBA",
          400: "#38F094",
          500: "#0ED974",
          600: "#05B45D",
          700: "#088D4C",
          800: "#0C6F3F",
          900: "#0c5b36",
          950: "#00331c"
        }
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
      body: [
        "Noto Sans Lao",
        "Poppins",
      ],
      sans: [
        "Noto Sans Lao",
        "Poppins",
        "sans-serif",
      ],
    },
  },
  plugins: [
    require('flowbite/plugin') 
  ],
}

