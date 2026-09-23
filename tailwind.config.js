/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gov: {
          navy: '#0f2744',
          'navy-dark': '#0a192c',
          'navy-light': '#1e3e62',
          blue: '#1d4ed8',
          'blue-light': '#3b82f6',
          green: '#047857',
          'green-light': '#10b981',
          'green-dark': '#064e3b',
          amber: '#d97706',
          'amber-light': '#f59e0b',
          red: '#dc2626',
          'red-light': '#ef4444',
          slate: '#0f172a',
          surface: '#f8fafc',
          card: '#ffffff',
          border: '#e2e8f0',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Outfit', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'gov-sm': '0 1px 2px 0 rgba(15, 23, 42, 0.05)',
        'gov-md': '0 4px 6px -1px rgba(15, 23, 42, 0.08), 0 2px 4px -2px rgba(15, 23, 42, 0.06)',
        'gov-lg': '0 10px 15px -3px rgba(15, 23, 42, 0.08), 0 4px 6px -4px rgba(15, 23, 42, 0.04)',
      },
    },
  },
  plugins: [],
};
