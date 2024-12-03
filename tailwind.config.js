// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
     
      'xs': '320px',   
      'sm': '640px',  
      'md': '768px',  
      'xl': '1280px', 
      '2xl': '1536px', 
    },
    extend: {

      fontSize: {
        'xs-mobile': '1rem',  
        'sm-mobile': '1.2rem',
      },
      padding: {
        'safe-mobile': '1rem'
      },
    },
  },
  plugins: [],
}