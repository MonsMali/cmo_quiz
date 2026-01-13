'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Language, Quiz, UserAnswer } from '@/types';
import { getTranslation } from '@/data/translations';
import LoadingSpinner from '@/components/LoadingSpinner';
import ProgressIndicator from '@/components/ProgressIndicator';
import QuizQuestion from '@/components/QuizQuestion';
import UserForm from '@/components/UserForm';
import ResultScreen from '@/components/ResultScreen';

type QuizState = 'loading' | 'quiz' | 'form' | 'submitting' | 'result' | 'error';

interface Result {
    correctAnswers: number;
    prizeTier: number;
    prizeName: string | null;
}

export default function QuizPage() {
    const router = useRouter();
    const [state, setState] = useState<QuizState>('loading');
    const [language, setLanguage] = useState<Language>('en');
    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<{ questionId: string; selectedIndex: number }[]>([]);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [result, setResult] = useState<Result | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Load language from localStorage and fetch quiz
    useEffect(() => {
        const savedLanguage = localStorage.getItem('quizLanguage') as Language;
        if (!savedLanguage) {
            router.push('/');
            return;
        }
        setLanguage(savedLanguage);
        fetchQuiz();
    }, [router]);

    const fetchQuiz = async () => {
        try {
            setState('loading');
            const response = await fetch('/api/quiz');
            if (!response.ok) throw new Error('Failed to fetch quiz');
            const data = await response.json();
            setQuiz(data.quiz);
            setState('quiz');
        } catch (err) {
            console.error('Error fetching quiz:', err);
            setError(getTranslation('errorOccurred', language));
            setState('error');
        }
    };

    const handleAnswer = useCallback((index: number) => {
        setSelectedIndex(index);
    }, []);

    const handleNext = useCallback(() => {
        if (selectedIndex === null || !quiz) return;

        const currentQuestion = quiz.questions[currentQuestionIndex];
        const newAnswer = {
            questionId: currentQuestion.id,
            selectedIndex: selectedIndex,
        };

        const newAnswers = [...answers, newAnswer];
        setAnswers(newAnswers);

        if (currentQuestionIndex < quiz.questions.length - 1) {
            // Move to next question
            setCurrentQuestionIndex((prev) => prev + 1);
            setSelectedIndex(null);
        } else {
            // All questions answered, show form
            setState('form');
        }
    }, [selectedIndex, quiz, currentQuestionIndex, answers]);

    const handleFormSubmit = async (formData: {
        name: string;
        email: string;
        gdprAccepted: boolean;
    }) => {
        if (!quiz) return;

        setState('submitting');

        try {
            const response = await fetch('/api/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    quizId: quiz.id,
                    answers,
                    language,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                if (data.code === 'DUPLICATE_EMAIL') {
                    setError(getTranslation('alreadyParticipated', language));
                    setState('error');
                    return;
                }
                throw new Error(data.error || 'Submission failed');
            }

            setResult({
                correctAnswers: data.correctAnswers,
                prizeTier: data.prizeTier,
                prizeName: data.prizeName,
            });
            setState('result');
        } catch (err) {
            console.error('Submission error:', err);
            setError(getTranslation('errorOccurred', language));
            setState('error');
        }
    };

    const handleRetry = () => {
        setError(null);
        setAnswers([]);
        setCurrentQuestionIndex(0);
        setSelectedIndex(null);
        setResult(null);
        fetchQuiz();
    };

    // Render based on state
    return (
        <main className="flex-1 flex items-center justify-center p-4">
            <div className="card max-w-lg w-full">
                {/* Loading state */}
                {state === 'loading' && (
                    <div className="py-12">
                        <LoadingSpinner size="lg" text={getTranslation('loading', language)} />
                    </div>
                )}

                {/* Quiz state */}
                {state === 'quiz' && quiz && (
                    <>
                        <ProgressIndicator
                            current={currentQuestionIndex + 1}
                            total={quiz.questions.length}
                            language={language}
                        />

                        <QuizQuestion
                            question={quiz.questions[currentQuestionIndex]}
                            language={language}
                            selectedIndex={selectedIndex}
                            onAnswer={handleAnswer}
                        />

                        {/* Next button */}
                        <button
                            onClick={handleNext}
                            disabled={selectedIndex === null}
                            className="btn-primary w-full mt-6"
                        >
                            {currentQuestionIndex < quiz.questions.length - 1
                                ? getTranslation('next', language)
                                : getTranslation('submit', language)}
                        </button>
                    </>
                )}

                {/* Form state */}
                {state === 'form' && (
                    <UserForm
                        language={language}
                        onSubmit={handleFormSubmit}
                        isLoading={false}
                    />
                )}

                {/* Submitting state */}
                {state === 'submitting' && (
                    <div className="py-12">
                        <LoadingSpinner size="lg" text={getTranslation('loading', language)} />
                    </div>
                )}

                {/* Result state */}
                {state === 'result' && result && (
                    <ResultScreen
                        language={language}
                        correctAnswers={result.correctAnswers}
                        totalQuestions={4}
                        prizeName={result.prizeName}
                        prizeTier={result.prizeTier}
                    />
                )}

                {/* Error state */}
                {state === 'error' && (
                    <div className="text-center py-8 slide-up">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-coral-500/20 flex items-center justify-center">
                            <span className="text-3xl">⚠️</span>
                        </div>
                        <p className="text-coral-500 mb-6">{error}</p>
                        <button onClick={handleRetry} className="btn-primary">
                            {getTranslation('tryAgain', language)}
                        </button>
                    </div>
                )}

                {/* Back to home link (only on result/error) */}
                {(state === 'result' || state === 'error') && (
                    <div className="mt-6 text-center">
                        <button
                            onClick={() => router.push('/')}
                            className="text-ocean-500 hover:text-ocean-600 text-sm font-medium underline underline-offset-4"
                        >
                            ← {language === 'pt' ? 'Voltar ao início' :
                                language === 'es' ? 'Volver al inicio' :
                                    language === 'fr' ? 'Retour à l\'accueil' :
                                        language === 'de' ? 'Zurück zur Startseite' :
                                            'Back to start'}
                        </button>
                    </div>
                )}
            </div>
        </main>
    );
}
