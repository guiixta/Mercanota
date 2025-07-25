/** @type {import('tailwindcss').Config} */
export default {
  // 1. Renomeado de 'purge' para 'content' e configurado para Vite/React
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  
  theme: {
    extend: {
      // Sua configuração de fonte está perfeita aqui!
      fontFamily: {
        'eurostile': ['Eurostile', 'sans-serif'],
        'archivoblack': ['"Archivo Black"', 'sans-serif'],
      },
    },
  },

  // 2. A seção 'variants' foi removida, pois não é mais necessária
  plugins: [],
}

