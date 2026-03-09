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

    const handleAnswer = (index: number) => {
        if (showFeedback) return;
        // Haptic feedback on mobile (degrades silently on iOS)
        if (typeof navigator !== 'undefined' && navigator.vibrate) {
            navigator.vibrate(10);
        }
        onAnswer(index);
    };

    return (
        <div>
            {/* Question text */}
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-ocean-800 mb-6 leading-relaxed">
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
                    let feedbackClass = '';

                    if (showFeedback && isSelected) {
                        if (isCorrect) {
                            buttonClass += ' !border-l-green-500 !bg-green-50';
                            iconBgClass = 'bg-green-500 text-white';
                            feedbackClass = 'feedback-correct';
                        } else {
                            buttonClass += ' !border-l-red-500 !bg-red-50';
                            iconBgClass = 'bg-red-500 text-white';
                            feedbackClass = 'feedback-wrong';
                        }
                    } else if (isSelected && !showFeedback) {
                        buttonClass += ' selected';
                        iconBgClass = 'bg-ocean-500 text-white';
                    }

                    // Show correct answer in green when feedback is shown and user was wrong
                    if (showFeedback && !isSelected && isCorrect && selectedIndex !== null) {
                        buttonClass += ' !border-l-green-400 !bg-green-50/50';
                    }

                    return (
                        <button
                            key={index}
                            onClick={() => handleAnswer(index)}
                            className={`${buttonClass} ${feedbackClass}`}
                            aria-pressed={isSelected}
                            disabled={showFeedback}
                        >
                            <span className="flex items-start gap-3">
                                <span
                                    className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold font-serif transition-colors ${iconBgClass}`}
                                >
                                    {showFeedback && isSelected && isCorrect && '✓'}
                                    {showFeedback && isSelected && !isCorrect && '✗'}
                                    {(!showFeedback || !isSelected) && String.fromCharCode(65 + index)}
                                </span>
                                <span className="text-ocean-800 pt-1.5">{option}</span>
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
