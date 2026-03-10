import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                // Visit Olhão blue - centered on logo color #14b0e6
                'ocean': {
                    50: '#f0f9ff',
                    100: '#e0f2fe',
                    200: '#bae6fd',
                    300: '#7dd3fc',
                    400: '#38bdf8',
                    500: '#14b0e6',
                    600: '#0d91c4',
                    700: '#0b749e',
                    800: '#0e6082',
                    900: '#11506b',
                },
                // Warm Algarve sand/stone
                'sand': {
                    50: '#fefdf8',
                    100: '#fdf6e3',
                    200: '#faecc7',
                    300: '#f2d99b',
                    400: '#e4bc6a',
                    500: '#d4a24a',
                },
                // Warm coral for errors
                'coral': {
                    400: '#e8836a',
                    500: '#e07a5f',
                    600: '#c4583e',
                },
                // Terracotta accent (kept for prize decorations)
                'terracotta': {
                    300: '#e8a882',
                    400: '#d4845a',
                    500: '#c4704b',
                    600: '#a85a3a',
                },
            },
            fontFamily: {
                sans: ['var(--font-plus-jakarta)', 'system-ui', '-apple-system', 'sans-serif'],
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-out',
                'slide-up': 'slideUp 0.5s ease-out',
                'scale-in': 'scaleIn 0.3s ease-out',
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                scaleIn: {
                    '0%': { opacity: '0', transform: 'scale(0.9)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
            },
        },
    },
    plugins: [],
}
export default config
