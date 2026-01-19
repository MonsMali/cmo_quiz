import { describe, it, expect } from 'vitest';
import { calculateCorrectAnswers, validateQuizCompletion, isAnswerCorrect, assignRandomQuiz } from './quizLogic';
import { Quiz, UserAnswer } from '@/types';

describe('quizLogic', () => {
    describe('calculateCorrectAnswers', () => {
        it('should return 0 for all incorrect answers', () => {
            const answers: UserAnswer[] = [
                { questionId: '1', selectedIndex: 0, isCorrect: false },
                { questionId: '2', selectedIndex: 1, isCorrect: false },
                { questionId: '3', selectedIndex: 2, isCorrect: false },
                { questionId: '4', selectedIndex: 3, isCorrect: false },
            ];
            expect(calculateCorrectAnswers(answers)).toBe(0);
        });

        it('should return 4 for all correct answers', () => {
            const answers: UserAnswer[] = [
                { questionId: '1', selectedIndex: 0, isCorrect: true },
                { questionId: '2', selectedIndex: 1, isCorrect: true },
                { questionId: '3', selectedIndex: 2, isCorrect: true },
                { questionId: '4', selectedIndex: 3, isCorrect: true },
            ];
            expect(calculateCorrectAnswers(answers)).toBe(4);
        });

        it('should return correct count for mixed answers', () => {
            const answers: UserAnswer[] = [
                { questionId: '1', selectedIndex: 0, isCorrect: true },
                { questionId: '2', selectedIndex: 1, isCorrect: false },
                { questionId: '3', selectedIndex: 2, isCorrect: true },
                { questionId: '4', selectedIndex: 3, isCorrect: false },
            ];
            expect(calculateCorrectAnswers(answers)).toBe(2);
        });

        it('should return 0 for empty array', () => {
            expect(calculateCorrectAnswers([])).toBe(0);
        });
    });

    describe('validateQuizCompletion', () => {
        const mockQuiz: Quiz = {
            id: 1,
            questions: [
                { id: 'q1', text: { pt: '', es: '', fr: '', de: '', en: '' }, options: [{ pt: '', es: '', fr: '', de: '', en: '' }], correctIndex: 0, image: null },
                { id: 'q2', text: { pt: '', es: '', fr: '', de: '', en: '' }, options: [{ pt: '', es: '', fr: '', de: '', en: '' }], correctIndex: 0, image: null },
                { id: 'q3', text: { pt: '', es: '', fr: '', de: '', en: '' }, options: [{ pt: '', es: '', fr: '', de: '', en: '' }], correctIndex: 0, image: null },
                { id: 'q4', text: { pt: '', es: '', fr: '', de: '', en: '' }, options: [{ pt: '', es: '', fr: '', de: '', en: '' }], correctIndex: 0, image: null },
            ],
        };

        it('should return true when all questions are answered', () => {
            const answers: UserAnswer[] = [
                { questionId: 'q1', selectedIndex: 0, isCorrect: true },
                { questionId: 'q2', selectedIndex: 1, isCorrect: false },
                { questionId: 'q3', selectedIndex: 2, isCorrect: true },
                { questionId: 'q4', selectedIndex: 3, isCorrect: false },
            ];
            expect(validateQuizCompletion(answers, mockQuiz)).toBe(true);
        });

        it('should return false when not all questions are answered', () => {
            const answers: UserAnswer[] = [
                { questionId: 'q1', selectedIndex: 0, isCorrect: true },
                { questionId: 'q2', selectedIndex: 1, isCorrect: false },
            ];
            expect(validateQuizCompletion(answers, mockQuiz)).toBe(false);
        });

        it('should return false for empty answers', () => {
            expect(validateQuizCompletion([], mockQuiz)).toBe(false);
        });
    });

    describe('isAnswerCorrect', () => {
        const mockQuiz: Quiz = {
            id: 1,
            questions: [
                { id: 'q1', text: { pt: '', es: '', fr: '', de: '', en: '' }, options: [{ pt: '', es: '', fr: '', de: '', en: '' }], correctIndex: 2, image: null },
            ],
        };

        it('should return true for correct answer', () => {
            expect(isAnswerCorrect(mockQuiz, 'q1', 2)).toBe(true);
        });

        it('should return false for incorrect answer', () => {
            expect(isAnswerCorrect(mockQuiz, 'q1', 0)).toBe(false);
        });

        it('should return false for non-existent question', () => {
            expect(isAnswerCorrect(mockQuiz, 'nonexistent', 0)).toBe(false);
        });
    });

    describe('assignRandomQuiz', () => {
        it('should return a quiz with 4 questions', () => {
            const quiz = assignRandomQuiz();
            expect(quiz.questions).toHaveLength(4);
        });

        it('should return a quiz with valid structure', () => {
            const quiz = assignRandomQuiz();
            expect(quiz).toHaveProperty('id');
            expect(quiz).toHaveProperty('questions');
            quiz.questions.forEach((q) => {
                expect(q).toHaveProperty('id');
                expect(q).toHaveProperty('text');
                expect(q).toHaveProperty('options');
                expect(q).toHaveProperty('correctIndex');
            });
        });
    });
});
