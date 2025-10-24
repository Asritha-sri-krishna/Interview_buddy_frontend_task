/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6366F1',
        secondary: '#F97316',
        dark: '#1F2937',
        light: '#F9FAFB',
      },
      spacing: {
        '24': '24px',
        '18': '18px',
      },
      borderRadius: {
        lg: '12px',
      },
    },
  },
  plugins: [],
}