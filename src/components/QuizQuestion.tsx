'use client';

import { Question, Language } from '@/types';

interface QuizQuestionProps {
    question: Question;
    language: Language;
    selectedIndex: number | null;
    onAnswer: (index: number) => void;
}

export default function QuizQuestion({
    question,
    language,
    selectedIndex,
    onAnswer,
}: QuizQuestionProps) {
    const questionText = question.text[language] || question.text.en;
    const options = question.options[language] || question.options.en;

    return (
        <div className="slide-up">
            {/* Question text */}
            <h2 className="text-xl sm:text-2xl font-bold text-ocean-800 mb-6 leading-relaxed">
                {questionText}
            </h2>

            {/* Answer options */}
            <div className="space-y-3">
                {options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => onAnswer(index)}
                        className={`btn-answer ${selectedIndex === index ? 'selected' : ''}`}
                        aria-pressed={selectedIndex === index}
                    >
                        <span className="flex items-start gap-3">
                            <span
                                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${selectedIndex === index
                                        ? 'bg-ocean-500 text-white'
                                        : 'bg-ocean-100 text-ocean-600'
                                    }`}
                            >
                                {String.fromCharCode(65 + index)}
                            </span>
                            <span className="text-ocean-800 pt-1">{option}</span>
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
}
