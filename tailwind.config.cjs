const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      keyframes: {
        typing: {
          "0%": {
            width: "0%",
            visibility: "hidden"
          },
          "100%": {
            width: "100%"
          }  
        },
        blink: {
          "50%": {
            borderColor: "transparent"
          },
          "100%": {
            borderColor: "white"
          }  
        }
      },
      animation: {
        typing: "typing 2s steps(20) infinite alternate, blink .7s infinite"
      },
      /* animationDelay: { // for 'tailwindcss-animated' plugin config.
        275: '275ms',
        5000: '5s',
      },
      animationDuration: { // for 'tailwindcss-animated' plugin config.
        2000: '2s',
        'long': '10s',
        'very-long': '20s',
      },*/
      fontFamily: {
        sans: ["Inter Variable", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
      },
      textColor: {
        default: "var(--color-text)",
        offset: "var(--color-text-offset)",
      },
      backgroundColor: {
        default: "var(--color-background)",
        offset: "var(--color-background-offset)",
      },
      borderColor: {
        default: "var(--color-border)",
      },
      screens: {
        'xxs-noyoutube': '135px',
        // => @media (min-width: 135px) { ... }
        
        'xxs': '240px',
        // => @media (min-width: 240px) { ... }
        
        'xs-noyoutube': '335px', // at this exact screen size, the youtube video gallery will disappear
        // => @media (min-width: 335px) { ... }
        
        'xs': '360px',
        // => @media (min-width: 360px) { ... }

        'sm': '640px',
        // => @media (min-width: 640px) { ... }
  
        'md': '768px',
        // => @media (min-width: 768px) { ... }
  
        'lg': '1024px',
        // => @media (min-width: 1024px) { ... }

        'lgxl': '1220px',
        // => @media (min-width: 1220px) { ... }

        'xl': '1280px',
        // => @media (min-width: 1280px) { ... }
        
        'xxl': '1480px',
        // => @media (min-width: 1480px) { ... }
      }
    },
  },
  corePlugins: {
    fontSize: false,
  },
  plugins: [require("tailwindcss-fluid-type"), require('tailwindcss-animated')], //, require('tailwindcss-animated')
};
