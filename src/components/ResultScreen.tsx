'use client';

import { Language } from '@/types';
import { getTranslation } from '@/data/translations';
import Confetti from './Confetti';

interface ResultScreenProps {
    language: Language;
    correctAnswers: number;
    totalQuestions: number;
    prizeName: string | null;
    prizeTier: number;
}

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
                {/* Result icon */}
                <div
                    className={`w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center shadow-lg ${hasWon
                            ? 'bg-gradient-to-br from-sand-200 to-sand-100'
                            : 'bg-gradient-to-br from-ocean-200 to-ocean-100'
                        } ${hasWon ? 'celebrate' : ''}`}
                >
                    <span className="text-5xl">{hasWon ? '🎉' : '🌊'}</span>
                </div>

                {/* Congratulations or Thank you */}
                <h2 className="text-3xl font-bold gradient-text mb-4">
                    {hasWon
                        ? getTranslation('congratulations', language)
                        : getTranslation('thankYou', language)}
                </h2>

                {/* Score */}
                <div className="mb-6">
                    <p className="text-ocean-700 text-lg">
                        {getTranslation('youAnswered', language)}{' '}
                        <span className="font-bold text-ocean-600">
                            {correctAnswers}
                        </span>{' '}
                        {getTranslation('outOf', language)}{' '}
                        <span className="font-bold text-ocean-600">{totalQuestions}</span>{' '}
                        {getTranslation('correctAnswers', language)}
                    </p>
                </div>

                {/* Prize or No prize message */}
                {hasWon && prizeName ? (
                    <div className="bg-gradient-to-r from-sand-100 to-sand-200 rounded-2xl p-6 mb-6 shadow-md celebrate">
                        <p className="text-ocean-600 font-medium mb-2">
                            {getTranslation('yourPrize', language)}
                        </p>
                        <p className="text-2xl font-bold text-ocean-800">{prizeName}</p>
                        <div className="mt-4 flex justify-center gap-2">
                            {Array.from({ length: prizeTier }).map((_, i) => (
                                <span key={i} className="text-2xl">⭐</span>
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

                {/* Decorative wave */}
                <div className="mt-8 text-6xl opacity-20">
                    🌊
                </div>
            </div>
        </>
    );
}
