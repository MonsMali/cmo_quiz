'use client';

import { Language, Question } from '@/types';

interface AnswerReviewProps {
    questions: Question[];
    userAnswers: { questionId: string; selectedIndex: number }[];
    language: Language;
}

// Labels for answer review by language
const reviewLabels: Record<Language, { correct: string; incorrect: string; yourAnswer: string; correctAnswer: string }> = {
    pt: {
        correct: 'Correto',
        incorrect: 'Incorreto',
        yourAnswer: 'Sua resposta',
        correctAnswer: 'Resposta correta',
    },
    es: {
        correct: 'Correcto',
        incorrect: 'Incorrecto',
        yourAnswer: 'Tu respuesta',
        correctAnswer: 'Respuesta correcta',
    },
    fr: {
        correct: 'Correct',
        incorrect: 'Incorrect',
        yourAnswer: 'Votre réponse',
        correctAnswer: 'Bonne réponse',
    },
    de: {
        correct: 'Richtig',
        incorrect: 'Falsch',
        yourAnswer: 'Ihre Antwort',
        correctAnswer: 'Richtige Antwort',
    },
    en: {
        correct: 'Correct',
        incorrect: 'Incorrect',
        yourAnswer: 'Your answer',
        correctAnswer: 'Correct answer',
    },
};

export default function AnswerReview({ questions, userAnswers, language }: AnswerReviewProps) {
    const labels = reviewLabels[language];

    return (
        <div className="space-y-4 mt-6">
            {questions.map((question, qIndex) => {
                const userAnswer = userAnswers.find((a) => a.questionId === question.id);
                const selectedIndex = userAnswer?.selectedIndex ?? -1;
                const isCorrect = selectedIndex === question.correctIndex;
                const questionText = question.text[language] || question.text.en;
                const options = question.options[language] || question.options.en;

                return (
                    <div
                        key={question.id}
                        className={`p-4 rounded-xl border-2 ${
                            isCorrect ? 'border-green-400 bg-green-50/50' : 'border-coral-400 bg-red-50/50'
                        }`}
                    >
                        {/* Question header with result badge */}
                        <div className="flex items-start justify-between gap-2 mb-3">
                            <h4 className="font-semibold text-ocean-800 text-sm">
                                {qIndex + 1}. {questionText}
                            </h4>
                            <span
                                className={`flex-shrink-0 px-2 py-1 rounded-full text-xs font-bold ${
                                    isCorrect
                                        ? 'bg-green-500 text-white'
                                        : 'bg-coral-500 text-white'
                                }`}
                            >
                                {isCorrect ? '✓' : '✗'}
                            </span>
                        </div>

                        {/* Answers */}
                        <div className="space-y-2">
                            {options.map((option, oIndex) => {
                                const isUserAnswer = oIndex === selectedIndex;
                                const isCorrectAnswer = oIndex === question.correctIndex;

                                let bgClass = 'bg-white/50';
                                let borderClass = 'border-transparent';
                                let textClass = 'text-ocean-600';

                                if (isCorrectAnswer) {
                                    bgClass = 'bg-green-100';
                                    borderClass = 'border-green-400';
                                    textClass = 'text-green-700';
                                } else if (isUserAnswer && !isCorrect) {
                                    bgClass = 'bg-red-100';
                                    borderClass = 'border-coral-400';
                                    textClass = 'text-coral-700';
                                }

                                return (
                                    <div
                                        key={oIndex}
                                        className={`flex items-center gap-2 p-2 rounded-lg border ${bgClass} ${borderClass}`}
                                    >
                                        <span
                                            className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                                                isCorrectAnswer
                                                    ? 'bg-green-500 text-white'
                                                    : isUserAnswer && !isCorrect
                                                    ? 'bg-coral-500 text-white'
                                                    : 'bg-ocean-100 text-ocean-600'
                                            }`}
                                        >
                                            {String.fromCharCode(65 + oIndex)}
                                        </span>
                                        <span className={`text-sm ${textClass}`}>{option}</span>
                                        {isUserAnswer && !isCorrectAnswer && (
                                            <span className="ml-auto text-xs text-coral-500 font-medium">
                                                ({labels.yourAnswer})
                                            </span>
                                        )}
                                        {isCorrectAnswer && (
                                            <span className="ml-auto text-xs text-green-600 font-medium">
                                                ✓
                                            </span>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
