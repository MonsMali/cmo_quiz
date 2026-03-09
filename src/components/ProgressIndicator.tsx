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
    const label = labels[language] || labels.en;

    return (
        <div className="flex-1">
            <span className="text-ocean-600 font-medium text-sm block mb-2">
                {label.question} {current} {label.of} {total}
            </span>
            <div className="flex items-center gap-2">
                {Array.from({ length: total }).map((_, i) => {
                    const step = i + 1;
                    let dotClass = 'progress-dot';
                    if (step < current) {
                        dotClass += ' progress-dot--completed';
                    } else if (step === current) {
                        dotClass += ' progress-dot--current';
                    } else {
                        dotClass += ' progress-dot--upcoming';
                    }
                    return <div key={i} className={dotClass} />;
                })}
            </div>
        </div>
    );
}
