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
import Timer from '@/components/Timer';
import AnswerReview from '@/components/AnswerReview';

type QuizState = 'loading' | 'quiz' | 'transitioning' | 'form' | 'submitting' | 'result' | 'error';

const QUESTION_TIME_LIMIT = 30; // seconds per question

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
    const [timerKey, setTimerKey] = useState(0); // Used to reset timer
    const [isAnimating, setIsAnimating] = useState(false);
    const [showReview, setShowReview] = useState(false);
    const [showFeedback, setShowFeedback] = useState(false);

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
            setTimerKey((prev) => prev + 1); // Start timer
        } catch (err) {
            console.error('Error fetching quiz:', err);
            setError(getTranslation('errorOccurred', language));
            setState('error');
        }
    };

    const handleAnswer = useCallback((index: number) => {
        if (showFeedback) return; // Prevent changing answer during feedback

        setSelectedIndex(index);
        setShowFeedback(true);
    }, [showFeedback]);

    const handleNext = useCallback(() => {
        if (!quiz) return;

        // Use current selected index or 0 if time ran out
        const answerIndex = selectedIndex ?? 0;

        const currentQuestion = quiz.questions[currentQuestionIndex];
        const newAnswer = {
            questionId: currentQuestion.id,
            selectedIndex: answerIndex,
        };

        const newAnswers = [...answers, newAnswer];

        // Update answers state first
        setAnswers(newAnswers);

        console.log('handleNext called, currentQuestionIndex:', currentQuestionIndex, 'Total answers after this:', newAnswers.length);

        if (currentQuestionIndex < quiz.questions.length - 1) {
            // Animate transition
            setIsAnimating(true);
            setState('transitioning');

            setTimeout(() => {
                setCurrentQuestionIndex((prev) => prev + 1);
                setSelectedIndex(null);
                setShowFeedback(false); // Reset feedback for next question
                setTimerKey((prev) => prev + 1); // Reset timer for next question
                setIsAnimating(false);
                setState('quiz');
            }, 300);
        } else {
            // All questions answered, wait a tick for state to update before showing form
            console.log('Last question answered, showing form after state update');
            setTimeout(() => {
                setState('form');
            }, 50); // Small delay to ensure state has updated
        }
    }, [selectedIndex, quiz, currentQuestionIndex, answers]);

    // Auto-advance after showing feedback
    useEffect(() => {
        if (showFeedback && selectedIndex !== null) {
            const timer = setTimeout(() => {
                handleNext();
            }, 1500);

            return () => clearTimeout(timer);
        }
    }, [showFeedback, selectedIndex, handleNext]);

    const handleTimeUp = useCallback(() => {
        // If no answer selected when time runs out, select first option (or skip)
        if (selectedIndex === null && quiz) {
            // Auto-select a random wrong answer or first option
            setSelectedIndex(0);
        }
        // Auto-advance to next question
        setTimeout(() => {
            handleNext();
        }, 500);
    }, [selectedIndex, quiz, handleNext]);

    const handleFormSubmit = async (formData: {
        name: string;
        email: string;
        gdprAccepted: boolean;
    }) => {
        if (!quiz) return;

        // Debug: Check how many answers we have before submitting
        console.log('Submitting with answers:', answers);
        console.log('Number of answers:', answers.length);

        if (answers.length !== 4) {
            console.error('ERROR: Expected 4 answers but have', answers.length);
            setError(`Internal error: Only ${answers.length} answers recorded. Please try again.`);
            setState('error');
            return;
        }

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
                // Set error and stay on error page (don't throw)
                console.error('Submission error:', data.error, data.code);
                setError(data.error || getTranslation('errorOccurred', language));
                setState('error');
                return;
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
        setShowReview(false);
        setShowFeedback(false);
        fetchQuiz();
    };

    const toggleReview = () => {
        setShowReview((prev) => !prev);
    };

    // Review button labels
    const reviewLabels: Record<Language, { show: string; hide: string }> = {
        pt: { show: 'Ver respostas', hide: 'Ocultar respostas' },
        es: { show: 'Ver respuestas', hide: 'Ocultar respuestas' },
        fr: { show: 'Voir les réponses', hide: 'Masquer les réponses' },
        de: { show: 'Antworten anzeigen', hide: 'Antworten ausblenden' },
        en: { show: 'View answers', hide: 'Hide answers' },
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
                {(state === 'quiz' || state === 'transitioning') && quiz && (
                    <>
                        {/* Header with progress and timer */}
                        <div className="flex items-center justify-between mb-4">
                            <ProgressIndicator
                                current={currentQuestionIndex + 1}
                                total={quiz.questions.length}
                                language={language}
                            />
                            <Timer
                                duration={QUESTION_TIME_LIMIT}
                                onTimeUp={handleTimeUp}
                                isActive={state === 'quiz'}
                                resetKey={timerKey}
                            />
                        </div>

                        {/* Question with animation */}
                        <div
                            key={currentQuestionIndex}
                            className={isAnimating ? 'slide-out-left' : 'slide-in-right'}
                        >
                            <QuizQuestion
                                question={quiz.questions[currentQuestionIndex]}
                                language={language}
                                selectedIndex={selectedIndex}
                                onAnswer={handleAnswer}
                                showFeedback={showFeedback}
                            />
                        </div>

                        {/* Next button - hidden when showing feedback (auto-advances) */}
                        {!showFeedback && (
                            <button
                                onClick={handleNext}
                                disabled={selectedIndex === null || state === 'transitioning'}
                                className="btn-primary w-full mt-6"
                            >
                                {currentQuestionIndex < quiz.questions.length - 1
                                    ? getTranslation('next', language)
                                    : getTranslation('submit', language)}
                            </button>
                        )}
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
                {state === 'result' && result && quiz && (
                    <>
                        <ResultScreen
                            language={language}
                            correctAnswers={result.correctAnswers}
                            totalQuestions={quiz.questions.length}
                            prizeName={result.prizeName}
                            prizeTier={result.prizeTier}
                        />

                        {/* Toggle answer review button */}
                        <div className="mt-4 text-center">
                            <button
                                onClick={toggleReview}
                                className="text-ocean-500 hover:text-ocean-600 text-sm font-medium underline underline-offset-4"
                            >
                                {showReview ? reviewLabels[language].hide : reviewLabels[language].show}
                            </button>
                        </div>

                        {/* Answer review section */}
                        {showReview && (
                            <div className="mt-4 slide-up">
                                <AnswerReview
                                    questions={quiz.questions}
                                    userAnswers={answers}
                                    language={language}
                                />
                            </div>
                        )}
                    </>
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
