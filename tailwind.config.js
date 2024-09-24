/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'light-orange': '#FFF5E1',
        'dark-orange': '#E95420',
        'strong-dark-orange': '#b33205',
      },
      fontFamily: {
        protest: ["ProtestGuerrilla-Regular"],
        protest_regular: ["ProtestGuerrilla-Regular", "Regular"]
      },
    },
    
  },
  plugins: [],
  assets: [
  ],
}

