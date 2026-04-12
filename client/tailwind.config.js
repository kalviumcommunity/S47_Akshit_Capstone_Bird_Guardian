/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        borderColorCycle: {
          '0%': { borderColor: 'rgba(0, 0, 0, 0.1)' },
          '25%': { borderColor: 'rgba(255, 0, 0, 0.5)' },
          '50%': { borderColor: 'rgba(0, 255, 0, 0.5)' },
          '75%': { borderColor: 'rgba(0, 0, 255, 0.5)' },
          '100%': { borderColor: 'rgba(0, 0, 0, 0.1)' },
        },
      },
      animation: {
        borderColorCycle: 'borderColorCycle 5s linear infinite',
      },
    },
  },
  plugins: [],
}
