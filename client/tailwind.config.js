/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontSize: {
      'login': ['40px', {
        lineHeight: '2rem',
        letterSpacing: '0.3em',
        fontWeight: '500',
      }],
      'email': ['40px', {
        fontWeight: '300',
      }],
      'hometext': ['5rem', {
        fontWeight: '700',
      }],
      'navtext': ['1.4rem', {
        fontWeight: '600',
      }],
      'navbigtext': ['2.2rem', {
        fontWeight: '600',
      }],
      'sm': ['14px', '20px'],
      'base': ['16px', '24px'],
      'lg': ['20px', '28px'],
      'xl': ['24px', '32px'],
      '2xl': ['30px', '36px'],
      '3xl': ['36px', '40px'],
    },
    extend: {
      colors: {
        'our-blue': '#0f1129',
        'our-orange':'#fe6102'
      },
      fontFamily: {
        'montserrat': ['Montserrat'],
        'lato': ['Lato'],
        'garamond': ['Garamond'],
        'robotoslab':['Roboto Slab']
      },
      dropShadow: {
        '3xl': ['350px 350px 350px rgba(0, 0, 0, 0.9)'],
        '4xl': [
            '0 35px 35px rgba(0, 0, 0, 0.25)',
            '0 45px 65px rgba(0, 0, 0, 0.15)',
        ]
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
};
