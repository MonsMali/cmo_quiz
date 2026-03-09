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
                // Mediterranean warm teal
                'ocean': {
                    50: '#f0fdfa',
                    100: '#ccfbf1',
                    200: '#99f6e4',
                    300: '#5eead4',
                    400: '#2dd4bf',
                    500: '#14b8a6',
                    600: '#0d9488',
                    700: '#0f766e',
                    800: '#115e59',
                    900: '#134e4a',
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
                // Terracotta accent
                'terracotta': {
                    300: '#e8a882',
                    400: '#d4845a',
                    500: '#c4704b',
                    600: '#a85a3a',
                },
            },
            fontFamily: {
                sans: ['DM Sans', 'system-ui', 'sans-serif'],
                serif: ['DM Serif Display', 'Georgia', 'serif'],
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
