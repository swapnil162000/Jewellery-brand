/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,jsx}',
    './src/components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#faf8f5',
        'warm-white': '#ffffff',
        charcoal: '#1a1a1a',
        'mid-grey': '#666666',
        'light-grey': '#e8e4df',
        accent: '#b8a99a',
        'accent-dark': '#8c7b6e',
        gold: '#c9a96e',
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'Georgia', 'Times New Roman', 'serif'],
        main: ['Inter', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 4px 24px rgba(0,0,0,0.06)',
        medium: '0 8px 40px rgba(0,0,0,0.12)',
      },
    },
  },
  plugins: [],
};
