import { Quiz, UserAnswer } from '@/types';
import { getRandomQuiz } from '@/data/quizzes';

/**
 * Get a random quiz with randomly selected questions from the pool
 */
export const assignRandomQuiz = (): Quiz => {
    // Get a fresh random quiz with shuffled questions from the pool
    return getRandomQuiz();
};

/**
 * Calculate the number of correct answers
 */
export const calculateCorrectAnswers = (answers: UserAnswer[]): number => {
    return answers.filter((a) => a.isCorrect).length;
};

/**
 * Validate that all 4 questions have been answered
 */
export const validateQuizCompletion = (answers: UserAnswer[], quiz: Quiz): boolean => {
    if (answers.length !== 4) return false;

    const questionIds = quiz.questions.map((q) => q.id);
    const answeredIds = answers.map((a) => a.questionId);

    return questionIds.every((id) => answeredIds.includes(id));
};

/**
 * Check if an answer is correct
 */
export const isAnswerCorrect = (quiz: Quiz, questionId: string, selectedIndex: number): boolean => {
    const question = quiz.questions.find((q) => q.id === questionId);
    if (!question) return false;
    return question.correctIndex === selectedIndex;
};
