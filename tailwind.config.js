/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        aura: {
          black: "#090807",
          charcoal: "#15120F",
          card: "#191512",
          cardHover: "#201B17",
          gold: "#D8B46A",
          goldLight: "#F0D495",
          goldDark: "#A6863F",
          ivory: "#FFF8EA",
          beige: "#E8D9C0",
          muted: "#9E9487",
          border: "#2F271E",
          borderGold: "rgba(216, 180, 106, 0.35)",
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #D8B46A 0%, #F5E2B8 50%, #B89243 100%)',
        'gold-glow': 'radial-gradient(circle, rgba(216, 180, 106, 0.15) 0%, rgba(9, 8, 7, 0) 70%)',
        'dark-gradient': 'linear-gradient(180deg, rgba(9, 8, 7, 0.6) 0%, rgba(9, 8, 7, 0.95) 100%)',
      },
      boxShadow: {
        'gold-subtle': '0 4px 25px -5px rgba(216, 180, 106, 0.15)',
        'gold-glow': '0 0 35px rgba(216, 180, 106, 0.25)',
      }
    },
  },
  plugins: [],
}
