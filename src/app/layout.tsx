import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import 'flag-icons/css/flag-icons.min.css';
import './globals.css';

const plusJakarta = Plus_Jakarta_Sans({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700', '800'],
    variable: '--font-plus-jakarta',
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'Quiz Olhão - B-Travel Barcelona 2026',
    description: 'Participe no Quiz Olhão e ganhe prémios! Teste os seus conhecimentos sobre Olhão, a Ria Formosa e o Algarve.',
    keywords: ['Olhão', 'Quiz', 'B-Travel', 'Barcelona', 'Algarve', 'Ria Formosa', 'Portugal', 'Tourism'],
    authors: [{ name: 'Município de Olhão' }],
    icons: {
        icon: '/favicon.png',
        apple: '/apple-touch-icon.png',
    },
    openGraph: {
        title: 'Quiz Olhão - B-Travel Barcelona 2026',
        description: 'Teste os seus conhecimentos sobre Olhão e ganhe prémios!',
        type: 'website',
        locale: 'pt_PT',
    },
};

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    themeColor: '#14b0e6',
    viewportFit: 'cover',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="pt" className={plusJakarta.variable}>
            <head>
                <link rel="icon" type="image/png" href="/favicon.png" />
                <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="default" />
            </head>
            <body className="min-h-screen">
                <div className="min-h-screen flex flex-col">
                    {children}
                </div>
            </body>
        </html>
    );
}
