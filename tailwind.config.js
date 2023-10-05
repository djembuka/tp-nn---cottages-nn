/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    /*screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },*/
    fontFamily: {
      sans: ['Montserrat', 'Arial', 'sans-serif'],
      serif: ['Playfair Display', 'Times New Roman', 'serif'],
    },
    extend: {
      screens: {
        sm: '480px',
      },
      colors: {
        'brand-blue': '#76A8CD',
        'brand-bg': '#2C0F04',
        'brand-2': '#D5AB77',
        'brand-2-dark': '#CB854D',
        'brand-3': '#B35B65',
        'brand-3-dark': '#872F2E',
        'brand-4': '#E6CDB4',
        'brand-4-dark': '#A6907A',
        tosale: '#77C443',
        soled: '#D81E1C',
      },
      spacing: {
        18: '4.5rem',
        '1/8': '12.5%',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
        '7xl': '3.5rem',
      },
      gridTemplateColumns: {
        header: '270px 1fr 35%',
        headerTablet: '270px 450px',
        headerMobile: '100px 100px',
        '1-2': '1fr 2fr',
      },
      gridTemplateRows: {
        layout: '100px 1fr 282px',
      },
    },
  },
  plugins: [],
};
