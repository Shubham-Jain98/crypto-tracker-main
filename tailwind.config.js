/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    colors : {
      yellowc: '#eebc1d',
      white : 'white',
      black : 'black',
      green : '#0FFF50',
      gold : '#EEBC1D',
      red : 'red'
    },
    theme: {
      extend: {
        spacing: {
          '100r': '100rem',
          '50r': '3.75rem',
          
        }
      }
    },
    extend: {},
  },
  plugins: [],
}

