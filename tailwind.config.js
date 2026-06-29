export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cyan: { DEFAULT: '#00F5FF', dim: '#00C8D4' },
        navy: { DEFAULT: '#050B18', mid: '#0A1628', surface: '#0D1F3C' },
      },
      fontFamily: {
        display: ['"Rajdhani"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
