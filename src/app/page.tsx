'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Language } from '@/types';
import { languageNames, getTranslation } from '@/data/translations';

// Flag icon country codes (for flag-icons library)
const flagCodes: Record<Language, string> = {
    pt: 'pt',
    es: 'es',
    fr: 'fr',
    de: 'de',
    en: 'gb',
};

// Flag component using flag-icons library
const FlagIcon = ({ language, size = 'md' }: { language: Language; size?: 'sm' | 'md' | 'lg' }) => {
    const sizeClasses = {
        sm: 'text-lg',
        md: 'text-2xl',
        lg: 'text-3xl',
    };
    return (
        <span
            className={`fi fi-${flagCodes[language]} ${sizeClasses[size]}`}
            style={{ borderRadius: '2px' }}
        />
    );
};

// Welcome messages by language
const welcomeMessages: Record<Language, { title: string; subtitle: string }> = {
    pt: {
        title: 'Descubra Olhão, a Ria Formosa e o Algarve!',
        subtitle: 'Responda 4 perguntas e ganhe prémios',
    },
    es: {
        title: '¡Descubre Olhão, la Ría Formosa y el Algarve!',
        subtitle: 'Responde 4 preguntas y gana premios',
    },
    fr: {
        title: 'Découvrez Olhão, la Ria Formosa et l\'Algarve !',
        subtitle: 'Répondez à 4 questions et gagnez des prix',
    },
    de: {
        title: 'Entdecken Sie Olhão, die Ria Formosa und die Algarve!',
        subtitle: 'Beantworten Sie 4 Fragen und gewinnen Sie Preise',
    },
    en: {
        title: 'Discover Olhão, Ria Formosa and the Algarve!',
        subtitle: 'Answer 4 questions and win prizes',
    },
};

export default function HomePage() {
    const router = useRouter();
    const [selectedLanguage, setSelectedLanguage] = useState<Language>('es');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLanguageChange = (lang: Language) => {
        setSelectedLanguage(lang);
        setIsDropdownOpen(false);
    };

    const handleStartQuiz = () => {
        // Store language in localStorage
        localStorage.setItem('quizLanguage', selectedLanguage);
        // Navigate to quiz
        router.push('/quiz');
    };

    const otherLanguages = (Object.keys(flagCodes) as Language[]).filter(
        (lang) => lang !== selectedLanguage
    );

    return (
        <main className="flex-1 flex items-center justify-center p-4">
            <div className="card max-w-md w-full text-center slide-up">
                {/* Language dropdown in top-right corner */}
                <div className="flex justify-end mb-4">
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-ocean-50 hover:bg-ocean-100 transition-colors border border-ocean-200"
                            aria-label={`Current language: ${languageNames[selectedLanguage]}. Click to change.`}
                        >
                            <FlagIcon language={selectedLanguage} size="md" />
                            <span className="text-sm font-medium text-ocean-700">
                                {languageNames[selectedLanguage]}
                            </span>
                            <svg
                                className={`w-4 h-4 text-ocean-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {/* Dropdown menu */}
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-ocean-200 py-1 z-50">
                                {otherLanguages.map((lang) => (
                                    <button
                                        key={lang}
                                        onClick={() => handleLanguageChange(lang)}
                                        className="w-full flex items-center gap-3 px-4 py-2 hover:bg-ocean-50 transition-colors text-left"
                                    >
                                        <FlagIcon language={lang} size="sm" />
                                        <span className="text-sm font-medium text-ocean-700">
                                            {languageNames[lang]}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Logo/Header */}
                <div className="mb-8">
                    <div className="mx-auto mb-4">
                        <Image
                            src="/logos/visit-olhao-01.png"
                            alt="Visit Olhão"
                            width={200}
                            height={100}
                            className="mx-auto"
                            priority
                        />
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold gradient-text mb-2">
                        Quiz do Município de Olhão
                    </h1>
                    <p className="text-ocean-600 font-medium">FITUR 2026</p>
                </div>

                {/* Welcome message - now dynamic based on selected language */}
                <div className="mb-8">
                    <p className="text-ocean-700 text-lg leading-relaxed">
                        {welcomeMessages[selectedLanguage].title}
                        <br />
                        <span className="text-ocean-500 text-base">
                            {welcomeMessages[selectedLanguage].subtitle}
                        </span>
                    </p>
                </div>

                {/* Start Quiz button */}
                <div className="mb-6">
                    <button
                        onClick={handleStartQuiz}
                        className="btn-primary w-full text-lg py-4"
                    >
                        {getTranslation('startQuiz', selectedLanguage)}
                    </button>
                </div>

                {/* Footer */}
                <div className="pt-6 border-t border-ocean-200">
                    <p className="text-ocean-400 text-xs">
                        Município de Olhão © 2026
                    </p>
                </div>
            </div>
        </main>
    );
}
