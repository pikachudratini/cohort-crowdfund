import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ink: '#08090a',
        graphite: '#111318',
        ivory: '#f7f3ea',
        navy: '#061b31',
        violet: '#6d5dfc',
        coral: '#ff6b4a',
        gold: '#f4c95d',
        mint: '#20c997',
      },
      boxShadow: {
        stripe: '0 30px 45px -30px rgba(50,50,93,.32), 0 18px 36px -18px rgba(0,0,0,.18)',
        glow: '0 0 80px rgba(109,93,252,.35)',
      },
    },
  },
  plugins: [],
};

export default config;
