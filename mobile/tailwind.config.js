module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        maroon: {
          DEFAULT: '#8B0000',
          dark: '#5C0000',
        },
        gold: {
          DEFAULT: '#D4A017',
          light: '#F4D03F',
        },
        cream: {
          DEFAULT: '#FFF8F0',
          dark: '#F5E6D3',
        },
        ink: '#2C1810',
        saffron: '#FF9933',
      },
      fontFamily: {
        marcellus: ["Marcellus_400Regular"],
        notoSans: ["NotoSansDevanagari_400Regular"],
      }
    },
  },
  plugins: [],
}
