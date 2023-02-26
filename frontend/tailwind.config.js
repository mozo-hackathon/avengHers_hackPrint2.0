/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin")

const Myclass = plugin(function ({ addUtilities})
{
  addUtilities({
    ".my-rotate-y-180":{
      transform:"rotateY(180deg)"
    },
    ".preserver-3d":{
      transformStyle: "preserve-3d",
    },
    ".perspective":{
      perspective: "1000px",
    },
    ".backface-hidden":{
      backfaceVisibility:"hidden",
    }
  })
})

module.exports = {
  theme: {
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    }
  }
}

module.exports = {
  mode:'jit',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    colors: {
      'darkblue': '#172acd',
      'light_blue': '#075985cc',
      'bluiy': '#87CEFA',
      transparent: 'transparent',
      'white': '#FFFFFF',
      'gray': '#D3D3D3',
      'cyan300': '#80DEEA',
      'sky50': '#87CEEB',
      'babyblue': '#89CFEF',
      'light_bluiy' : '#29B6F6',
      'blue-gray-200': '#CDDEEE',
      'blue-gray-400':'#CDDEEF',
      'pink-400': ' #EC407A',
      'lightblue-600': ' #039BE5',
      'blue_gray-800': '#37474F',
      'facebookblue': '#0000FF',
      'gray50':'#fafafa',
      'gray100':'#f3f4f6',
      'gray300':'#cbd5e1',
      'gray400':'#94a3b8',
      'gray700':'#334155',
      'sky100':'#e0f2fe',
      'sky200':'#bae6fd',
      'sky300':'#7dd3fc',
      'blue400':'#87CEFA',
      'black':'#000000',
    },
    extend: {
        backGroundimage:
        {
          'Homepage': "url('https://medicaldialogues.in/h-upload/2022/10/13/187809-medical-insurance-1.webp')"
        },
    },
  },
  extend: {
    // backGroundimage: {
    //   'gradient-radial': 'radial-gradient(bg-gradient-to-r from-cyan-100 to-cyan-200'
    // }
},
  plugins: [
    Myclass
  ],
}