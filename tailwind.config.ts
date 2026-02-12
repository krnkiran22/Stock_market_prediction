import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Base/Neutral Colors
        'trade-main': '#0B0E11',        // Background Primary
        'trade-secondary': '#161A1F',   // Cards, panels
        'trade-tertiary': '#1F2937',    // Input fields, headers
        'trade-hover': '#252A31',       // Surface Hover
        'trade-border-light': '#252A31',
        'trade-border-medium': '#374151',
        'trade-border-heavy': '#4B5563', // Active/focused

        // Text Hierarchy
        'trade-text-primary': '#E8EAED',   // Off-white
        'trade-text-secondary': '#9BA3AF', // Labels
        'trade-text-tertiary': '#6B7280',  // Metadata
        'trade-text-disabled': '#4B5563',

        // Semantic Colors
        'trade-up': '#00C896',      // Bullish/Positive (Teal green)
        'trade-down': '#FF3B69',    // Bearish/Negative (Coral red)
        'trade-info': '#2D5BFF',    // Neutral/Info (Deep blue)
        'trade-warning': '#FFB020', // Warning (Amber)

        // Chart-Specific Colors
        'chart-bull': '#26A69A',
        'chart-bear': '#EF5350',
        'chart-prediction': '#3B82F6',
        'chart-support': '#10B981',
        'chart-resistance': '#EF4444',
        'chart-grid': '#1F2937',

        // New Brand Colors
        'brand-primary': '#1E3A8A',    // Deep Blue
        'brand-secondary': '#10B981',  // Emerald Green
        'brand-accent': '#F59E0B',     // Gold
        'brand-bg': '#F9FAFB',         // Light Gray
        'brand-text': '#1F2937',       // Dark Gray
        'brand-success': '#22C55E',    // Green
        'brand-danger': '#EF4444',     // Red
        'brand-neutral': '#EAB308',     // Yellow
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Consolas', 'monospace'],
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'base': '12px',
        'md': '16px',
      },
    },
  },
  plugins: [],
}

export default config
