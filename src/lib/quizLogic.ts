import { Quiz, UserAnswer } from '@/types';
import { quizzes } from '@/data/quizzes';

// Track quiz distribution for even assignment
// In production, this would be stored in the database
let quizCounts: Record<number, number> = {};

// Initialize quiz counts
quizzes.forEach((q) => {
    quizCounts[q.id] = 0;
});

/**
 * Get a random quiz with even distribution
 * Prioritizes quizzes that have been assigned less frequently
 */
export const assignRandomQuiz = (): Quiz => {
    // Find the minimum count
    const minCount = Math.min(...Object.values(quizCounts));

    // Get all quizzes with the minimum count
    const availableQuizzes = quizzes.filter((q) => quizCounts[q.id] === minCount);

    // Pick a random one from the available quizzes
    const randomIndex = Math.floor(Math.random() * availableQuizzes.length);
    const selectedQuiz = availableQuizzes[randomIndex];

    // Increment the count for the selected quiz
    quizCounts[selectedQuiz.id]++;

    return selectedQuiz;
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

/**
 * Reset quiz distribution counts (for testing)
 */
export const resetQuizCounts = (): void => {
    quizzes.forEach((q) => {
        quizCounts[q.id] = 0;
    });
};

/**
 * Get current quiz distribution stats
 */
export const getQuizDistribution = (): Record<number, number> => {
    return { ...quizCounts };
};
