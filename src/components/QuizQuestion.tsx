'use client';

import { Question, Language } from '@/types';

interface QuizQuestionProps {
    question: Question;
    language: Language;
    selectedIndex: number | null;
    onAnswer: (index: number) => void;
    showFeedback?: boolean;
}

export default function QuizQuestion({
    question,
    language,
    selectedIndex,
    onAnswer,
    showFeedback = false,
}: QuizQuestionProps) {
    const questionText = question.text[language] || question.text.en;
    const options = question.options[language] || question.options.en;

    return (
        <div>
            {/* Question text */}
            <h2 className="text-xl sm:text-2xl font-bold text-ocean-800 mb-6 leading-relaxed">
                {questionText}
            </h2>

            {/* Answer options */}
            <div className="space-y-3">
                {options.map((option, index) => {
                    const isSelected = selectedIndex === index;
                    const isCorrect = index === question.correctIndex;

                    // Determine styling based on feedback state
                    let buttonClass = 'btn-answer';
                    let iconBgClass = 'bg-ocean-100 text-ocean-600';

                    if (showFeedback && isSelected) {
                        // Show feedback for selected answer
                        if (isCorrect) {
                            buttonClass += ' !border-green-500 !bg-green-50';
                            iconBgClass = 'bg-green-500 text-white';
                        } else {
                            buttonClass += ' !border-red-500 !bg-red-50';
                            iconBgClass = 'bg-red-500 text-white';
                        }
                    } else if (isSelected && !showFeedback) {
                        buttonClass += ' selected';
                        iconBgClass = 'bg-ocean-500 text-white';
                    }

                    // Show correct answer in green when feedback is shown and user was wrong
                    if (showFeedback && !isSelected && isCorrect && selectedIndex !== null) {
                        buttonClass += ' !border-green-400 !bg-green-50/50';
                    }

                    return (
                        <button
                            key={index}
                            onClick={() => !showFeedback && onAnswer(index)}
                            className={buttonClass}
                            aria-pressed={isSelected}
                            disabled={showFeedback}
                        >
                            <span className="flex items-start gap-3">
                                <span
                                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${iconBgClass}`}
                                >
                                    {showFeedback && isSelected && isCorrect && '✓'}
                                    {showFeedback && isSelected && !isCorrect && '✗'}
                                    {(!showFeedback || !isSelected) && String.fromCharCode(65 + index)}
                                </span>
                                <span className="text-ocean-800 pt-1">{option}</span>
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
