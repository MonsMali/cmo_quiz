'use client';

import Image from 'next/image';
import dynamic from 'next/dynamic';
import { Language } from '@/types';
import { getTranslation } from '@/data/translations';

// BUNDLE OPTIMIZATION: Dynamically import Confetti (only loaded when user wins)
const Confetti = dynamic(() => import('./Confetti'), {
    ssr: false,
    loading: () => null,
});

interface ResultScreenProps {
    language: Language;
    correctAnswers: number;
    totalQuestions: number;
    prizeName: string | null;
    prizeTier: number;
}

// SVG trophy icon for winners
const TrophyIcon = () => (
    <svg viewBox="0 0 48 48" className="w-14 h-14">
        <path
            d="M24 4l5.5 11.2L42 17l-9 8.8L35 38 24 32.2 13 38l2-12.2L6 17l12.5-1.8z"
            fill="var(--sand-300)"
            stroke="var(--terracotta-500)"
            strokeWidth="1.5"
            strokeLinejoin="round"
        />
    </svg>
);

// SVG wave icon for non-winners
const WaveIcon = () => (
    <svg viewBox="0 0 48 48" className="w-14 h-14">
        <path
            d="M6 24 Q12 16, 18 24 T30 24 T42 24"
            stroke="var(--ocean-400)"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
        />
        <path
            d="M6 30 Q12 22, 18 30 T30 30 T42 30"
            stroke="var(--ocean-300)"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.6"
        />
    </svg>
);

// Score ring component
const ScoreRing = ({ correct, total }: { correct: number; total: number }) => {
    const radius = 36;
    const circumference = 2 * Math.PI * radius;
    const progress = correct / total;
    const offset = circumference * (1 - progress);

    const getColor = () => {
        if (correct >= 3) return '#22c55e'; // green
        if (correct === 2) return '#e4bc6a'; // sand-400 (amber)
        return 'var(--ocean-500)';
    };

    return (
        <div className="relative w-24 h-24 mx-auto mb-6">
            <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 96 96">
                <circle
                    cx="48"
                    cy="48"
                    r={radius}
                    stroke="var(--ocean-100)"
                    strokeWidth="6"
                    fill="transparent"
                />
                <circle
                    cx="48"
                    cy="48"
                    r={radius}
                    stroke={getColor()}
                    strokeWidth="6"
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    className="score-ring"
                />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-ocean-800">
                    {correct}<span className="text-ocean-400 text-lg">/{total}</span>
                </span>
            </div>
        </div>
    );
};

// SVG star for prize display
const StarIcon = ({ className = '' }: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={`w-6 h-6 ${className}`} fill="var(--terracotta-400)" stroke="var(--terracotta-500)" strokeWidth="1">
        <path d="M12 2l2.9 5.9L21 9l-4.5 4.4L17.8 20 12 16.9 6.2 20l1.3-6.6L3 9l6.1-1.1z" />
    </svg>
);

export default function ResultScreen({
    language,
    correctAnswers,
    totalQuestions,
    prizeName,
    prizeTier,
}: ResultScreenProps) {
    const hasWon = prizeTier > 0;

    return (
        <>
            <Confetti trigger={hasWon} />

            <div className="slide-up text-center">
                {/* Result icon - SVG instead of emoji */}
                <div
                    className={`w-24 h-24 mx-auto mb-2 rounded-full flex items-center justify-center shadow-lg ${hasWon
                            ? 'bg-gradient-to-br from-sand-200 to-sand-100'
                            : 'bg-gradient-to-br from-ocean-200 to-ocean-100'
                        } ${hasWon ? 'celebrate' : ''}`}
                >
                    {hasWon ? <TrophyIcon /> : <WaveIcon />}
                </div>

                {/* Congratulations or Thank you */}
                <h2 className="text-3xl font-extrabold gradient-text mb-4 tracking-tight">
                    {hasWon
                        ? getTranslation('congratulations', language)
                        : getTranslation('thankYou', language)}
                </h2>

                {/* Score ring */}
                <ScoreRing correct={correctAnswers} total={totalQuestions} />

                {/* Score label */}
                <p className="text-ocean-600 text-sm mb-6">
                    {getTranslation('youAnswered', language)}{' '}
                    <span className="font-bold">{correctAnswers}</span>{' '}
                    {getTranslation('outOf', language)}{' '}
                    <span className="font-bold">{totalQuestions}</span>{' '}
                    {getTranslation('correctAnswers', language)}
                </p>

                {/* Prize or No prize message */}
                {hasWon && prizeName ? (
                    <div className="prize-shimmer rounded-2xl p-6 mb-6 shadow-md celebrate" style={{ borderTop: '3px solid var(--terracotta-400)' }}>
                        <p className="text-ocean-600 font-medium mb-2">
                            {getTranslation('yourPrize', language)}
                        </p>
                        <p className="text-2xl font-bold text-ocean-800">{prizeName}</p>
                        <div className="mt-4 flex justify-center gap-1.5">
                            {Array.from({ length: prizeTier }).map((_, i) => (
                                <StarIcon key={i} />
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="bg-ocean-100/50 rounded-2xl p-6 mb-6">
                        <p className="text-ocean-600">
                            {getTranslation('noPrize', language)}
                        </p>
                    </div>
                )}

                {/* Visit Olhão message */}
                <a
                    href="https://www.visitolhao.pt/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-ocean-500 text-lg font-medium hover:text-ocean-600 transition-colors"
                >
                    {getTranslation('visitOlhao', language)}
                </a>

                {/* Visit Olhão logo - clickable */}
                <div className="mt-8">
                    <a
                        href="https://www.visitolhao.pt/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Image
                            src="/logos/visit-olhao-03.png"
                            alt="Visit Olhão"
                            width={150}
                            height={75}
                            className="mx-auto hover:opacity-80 transition-opacity"
                        />
                    </a>
                </div>

                {/* Social media links */}
                <div className="mt-5 flex items-center justify-center gap-4">
                    <a
                        href="https://www.facebook.com/p/Visit-Olh%C3%A3o-100057275173920/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-ocean-400 hover:text-ocean-600 transition-colors"
                        aria-label="Instagram Visit Olhão"
                    >
                        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                        </svg>
                    </a>
                    <a
                        href="https://www.facebook.com/visitolhao"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-ocean-400 hover:text-ocean-600 transition-colors"
                        aria-label="Facebook Visit Olhão"
                    >
                        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                    </a>
                </div>
            </div>
        </>
    );
}
