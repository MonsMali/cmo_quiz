'use client';

import { useRouter } from 'next/navigation';
import { Language } from '@/types';
import { languageNames } from '@/data/translations';

// Flag emoji components
const flags: Record<Language, string> = {
    pt: '🇵🇹',
    es: '🇪🇸',
    fr: '🇫🇷',
    de: '🇩🇪',
    en: '🇬🇧',
};

export default function HomePage() {
    const router = useRouter();

    const handleLanguageSelect = (lang: Language) => {
        // Store language in localStorage
        localStorage.setItem('quizLanguage', lang);
        // Navigate to quiz
        router.push('/quiz');
    };

    return (
        <main className="flex-1 flex items-center justify-center p-4">
            <div className="card max-w-md w-full text-center slide-up">
                {/* Logo/Header */}
                <div className="mb-8">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-ocean-400 to-ocean-600 flex items-center justify-center shadow-lg">
                        <span className="text-4xl">🌊</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold gradient-text mb-2">
                        Quiz Olhão
                    </h1>
                    <p className="text-ocean-600 font-medium">FITUR 2026</p>
                </div>

                {/* Welcome message */}
                <div className="mb-8">
                    <p className="text-ocean-700 text-lg leading-relaxed">
                        Descubra Olhão, a Ria Formosa e o Algarve!
                        <br />
                        <span className="text-ocean-500 text-base">
                            Responda 4 perguntas e ganhe prémios
                        </span>
                    </p>
                </div>

                {/* Language selector */}
                <div className="mb-6">
                    <p className="text-ocean-600 text-sm mb-4 font-medium uppercase tracking-wide">
                        Selecione o seu idioma / Select your language
                    </p>
                    <div className="grid grid-cols-5 gap-2 sm:gap-3">
                        {(Object.keys(flags) as Language[]).map((lang) => (
                            <button
                                key={lang}
                                onClick={() => handleLanguageSelect(lang)}
                                className="flag-btn"
                                aria-label={`Select ${languageNames[lang]}`}
                            >
                                <span className="text-3xl sm:text-4xl mb-1">{flags[lang]}</span>
                                <span className="text-xs text-ocean-600 font-medium uppercase">
                                    {lang}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="pt-6 border-t border-ocean-200">
                    <p className="text-ocean-400 text-xs">
                        Câmara Municipal de Olhão © 2026
                    </p>
                </div>
            </div>
        </main>
    );
}
