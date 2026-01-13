'use client';

import { Language } from '@/types';

interface ProgressIndicatorProps {
    current: number;
    total: number;
    language: Language;
}

const labels: Record<Language, { question: string; of: string }> = {
    pt: { question: 'Pergunta', of: 'de' },
    es: { question: 'Pregunta', of: 'de' },
    fr: { question: 'Question', of: 'sur' },
    de: { question: 'Frage', of: 'von' },
    en: { question: 'Question', of: 'of' },
};

export default function ProgressIndicator({
    current,
    total,
    language,
}: ProgressIndicatorProps) {
    const percentage = (current / total) * 100;
    const label = labels[language] || labels.en;

    return (
        <div className="flex-1">
            <div className="flex justify-between items-center mb-2">
                <span className="text-ocean-600 font-medium text-sm">
                    {label.question} {current} {label.of} {total}
                </span>
                <span className="text-ocean-400 text-sm font-medium">
                    {Math.round(percentage)}%
                </span>
            </div>
            <div className="progress-bar">
                <div
                    className="progress-bar-fill"
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
}
