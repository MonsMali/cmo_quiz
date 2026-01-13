import type { Metadata, Viewport } from 'next';
import 'flag-icons/css/flag-icons.min.css';
import './globals.css';

export const metadata: Metadata = {
    title: 'Quiz Olhão - FITUR 2026',
    description: 'Participe no Quiz Olhão e ganhe prémios! Teste os seus conhecimentos sobre Olhão, a Ria Formosa e o Algarve.',
    keywords: ['Olhão', 'Quiz', 'FITUR', 'Algarve', 'Ria Formosa', 'Portugal', 'Tourism'],
    authors: [{ name: 'Câmara Municipal de Olhão' }],
    openGraph: {
        title: 'Quiz Olhão - FITUR 2026',
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
    themeColor: '#0ea5e9',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="pt">
            <head>
                <link rel="icon" href="/favicon.ico" sizes="any" />
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
