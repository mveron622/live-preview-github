/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        'none': '0px',
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '32px',
        'full': '999px',
      },
      spacing: {
        'half': '4px',    // spacing-half: 4px
        'base': '8px',    // spacing-base: 8px
        '2': '16px',      // spacing-2: 16px
        '3': '24px',      // spacing-3: 24px
        '4': '32px',      // spacing-4: 32px
        '5': '40px',      // spacing-5: 40px
        '6': '48px',      // spacing-6: 48px
        '7': '56px',      // spacing-7: 56px
        '8': '64px',      // spacing-8: 64px
        '9': '80px',      // spacing-9: 80px
      },
      colors: {
        // Base colors
        base: 'rgb(255, 255, 255)', // white/100
        default: 'rgb(50, 50, 50)', // gray/50
        moderate: 'rgb(200, 200, 200)', // gray/200
        disabled: 'rgb(200, 200, 200)', // gray/200

        // Inverted colors
        inverted: 'rgb(26, 26, 26)', // gray/900
        pressed: 'rgb(132, 132, 132)', // gray/500
        brand: '#005699',

        // Overlay colors
        'overlay-white': 'rgba(255, 255, 255, 0.6)', // #FFFFFF - 60%
        'overlay-dark': 'rgba(26, 26, 26, 0.6)', // #1A1A1A - 60%
      },
      backgroundColor: {
        // Background specific colors
        base: 'rgb(255, 255, 255)', // white/100
        default: 'rgb(50, 50, 50)', // gray/50
        moderate: 'rgb(200, 200, 200)', // gray/200
        disabled: 'rgb(200, 200, 200)', // gray/200
        inverted: 'rgb(26, 26, 26)', // gray/900
        pressed: 'rgb(132, 132, 132)', // gray/500
      }
    }
  },
  plugins: [],
} 