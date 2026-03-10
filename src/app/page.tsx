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
    const [isReady, setIsReady] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Staggered entrance animation
    useEffect(() => {
        const timer = setTimeout(() => setIsReady(true), 100);
        return () => clearTimeout(timer);
    }, []);

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
        localStorage.setItem('quizLanguage', selectedLanguage);
        router.push('/quiz');
    };

    const otherLanguages = (Object.keys(flagCodes) as Language[]).filter(
        (lang) => lang !== selectedLanguage
    );

    return (
        <main className="flex-1 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Subtle azulejo-inspired pattern background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="azulejo" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M20 0L40 20L20 40L0 20Z" fill="none" stroke="currentColor" strokeWidth="0.8" />
                            <circle cx="20" cy="20" r="5" fill="none" stroke="currentColor" strokeWidth="0.5" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#azulejo)" className="text-ocean-700" opacity="0.04" />
                </svg>
            </div>

            <div
                className={`card max-w-md w-full text-center relative transition-all duration-700 ${
                    isReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
            >
                {/* Language selector - top right */}
                <div
                    className={`flex justify-end mb-6 transition-all duration-500 delay-200 ${
                        isReady ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
                    }`}
                >
                    <div className="relative z-50" ref={dropdownRef}>
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/60 hover:bg-white/80 transition-all duration-200 border border-ocean-200/60 shadow-sm hover:shadow-md"
                            aria-label={`Current language: ${languageNames[selectedLanguage]}. Click to change.`}
                        >
                            <FlagIcon language={selectedLanguage} size="md" />
                            <span className="text-sm font-medium text-ocean-700">
                                {languageNames[selectedLanguage]}
                            </span>
                            <svg
                                className={`w-4 h-4 text-ocean-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {/* Dropdown menu with animation */}
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-ocean-100 py-1 z-50 dropdown-enter">
                                {otherLanguages.map((lang) => (
                                    <button
                                        key={lang}
                                        onClick={() => handleLanguageChange(lang)}
                                        className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-ocean-50/80 transition-colors text-left"
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

                {/* Hero brand: Visit Olhão */}
                <div
                    className={`transition-all duration-600 delay-300 ${
                        isReady ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                    }`}
                >
                    <Image
                        src="/logos/visit-olhao-01.png"
                        alt="Visit Olhão"
                        width={220}
                        height={110}
                        className="mx-auto drop-shadow-sm"
                        priority
                    />
                </div>

                {/* Quiz title */}
                <div
                    className={`mt-5 transition-all duration-600 delay-[400ms] ${
                        isReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}
                >
                    <h1 className="text-2xl sm:text-3xl font-extrabold gradient-text leading-tight tracking-tight">
                        Quiz do Município de Olhão
                    </h1>
                </div>

                {/* Event badge: B-Travel */}
                <div
                    className={`mt-5 inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-ocean-50/80 border border-ocean-200/50 transition-all duration-600 delay-500 ${
                        isReady ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                    }`}
                >
                    <Image
                        src="/logos/btravel.png"
                        alt="B-Travel Barcelona"
                        width={120}
                        height={33}
                        className="object-contain"
                    />
                    <span className="text-ocean-400 text-xs font-light">|</span>
                    <span className="text-ocean-600 text-xs font-semibold tracking-wide uppercase">
                        Barcelona 2026
                    </span>
                </div>

                {/* Welcome message */}
                <div
                    className={`mt-8 mb-8 transition-all duration-600 delay-[600ms] ${
                        isReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}
                >
                    <p className="text-ocean-800 text-lg font-medium leading-relaxed">
                        {welcomeMessages[selectedLanguage].title}
                    </p>
                    <p className="text-ocean-500 text-sm mt-2 tracking-wide">
                        {welcomeMessages[selectedLanguage].subtitle}
                    </p>
                </div>

                {/* Start Quiz button */}
                <div
                    className={`mb-8 transition-all duration-600 delay-700 ${
                        isReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}
                >
                    <button
                        onClick={handleStartQuiz}
                        className="btn-cta w-full text-lg py-4 group relative overflow-hidden"
                    >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                            {getTranslation('startQuiz', selectedLanguage)}
                            <svg
                                className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </span>
                    </button>
                </div>

                {/* Footer */}
                <div
                    className={`pt-5 border-t border-ocean-200/40 transition-all duration-600 delay-[800ms] ${
                        isReady ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                    <p className="text-ocean-400/70 text-xs tracking-wider">
                        Município de Olhão © 2026
                    </p>
                </div>
            </div>
        </main>
    );
}
