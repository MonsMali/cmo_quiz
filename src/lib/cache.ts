import { cache } from 'react';
import { questionPool } from '@/data/quizzes';
import { Question } from '@/types';

/**
 * CACHING UTILITIES
 * Following Vercel React Best Practices:
 * - server-cache-react: Use React.cache() for per-request deduplication
 * - js-index-maps: Build Map data structures for O(1) lookups
 */

// Build a Map for O(1) question lookups by ID (js-index-maps rule)
const questionMap = new Map<string, Question>(
    questionPool.map((q) => [q.id, q])
);

/**
 * Get question by ID with O(1) lookup
 * Cached per-request to deduplicate lookups within the same render cycle
 */
export const getQuestionById = cache((questionId: string): Question | undefined => {
    return questionMap.get(questionId);
});

/**
 * Get all questions - cached per-request
 */
export const getAllQuestions = cache((): Question[] => {
    return questionPool;
});

/**
 * Get question pool size - useful for validation
 */
export const getQuestionPoolSize = cache((): number => {
    return questionPool.length;
});
