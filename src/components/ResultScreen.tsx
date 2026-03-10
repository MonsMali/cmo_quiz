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
                <p className="text-ocean-500 text-lg font-medium">
                    {getTranslation('visitOlhao', language)}
                </p>

                {/* Visit Olhão logo */}
                <div className="mt-8">
                    <Image
                        src="/logos/visit-olhao-03.png"
                        alt="Visit Olhão"
                        width={150}
                        height={75}
                        className="mx-auto"
                    />
                </div>
            </div>
        </>
    );
}
