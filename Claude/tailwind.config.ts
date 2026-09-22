import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        void: '#000000',
        ink: '#1D1D1F',
        paper: '#F5F5F7',
        mute: '#86868B',
        aurora: {
          blue: '#6E8BFF',
          violet: '#B08CFF',
        },
      },
      fontFamily: {
        sans: ['var(--font-display)'],
      },
      fontSize: {
        // Cinematic display scale — fluid, tuned for negative space.
        display: ['clamp(3.25rem, 12vw, 10.5rem)', { lineHeight: '0.9', letterSpacing: '-0.045em' }],
        headline: ['clamp(2.25rem, 6.2vw, 5.25rem)', { lineHeight: '1.02', letterSpacing: '-0.035em' }],
        title: ['clamp(1.6rem, 3.2vw, 2.75rem)', { lineHeight: '1.1', letterSpacing: '-0.025em' }],
        lede: ['clamp(1.05rem, 1.55vw, 1.375rem)', { lineHeight: '1.5', letterSpacing: '-0.012em' }],
      },
      maxWidth: {
        measure: '34rem',
        shell: '80rem',
      },
      transitionTimingFunction: {
        // Apple's standard easing curve.
        apple: 'cubic-bezier(0.28, 0.11, 0.32, 1)',
      },
      backdropBlur: {
        pane: '28px',
      },
    },
  },
  plugins: [],
};

export default config;
