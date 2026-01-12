import { Language, Prize } from '@/types';
import { prizes, getPrizesByTier } from '@/data/prizes';

/**
 * Calculate prize tier based on correct answers
 * 0 correct = tier 0 (no prize)
 * 1 correct = tier 1 (prizes 1-2)
 * 2 correct = tier 2 (prizes 3-4)
 * 3 correct = tier 3 (prizes 5-6)
 * 4 correct = tier 4 (prizes 7-8)
 */
export const calculatePrizeTier = (correctAnswers: number): number => {
    if (correctAnswers < 0 || correctAnswers > 4) {
        throw new Error('Correct answers must be between 0 and 4');
    }
    return correctAnswers;
};

/**
 * Assign a random prize from the appropriate tier
 * Returns null for tier 0 (no prize)
 */
export const assignPrize = (prizeTier: number): Prize | null => {
    if (prizeTier === 0) return null;

    const tierPrizes = getPrizesByTier(prizeTier);
    if (tierPrizes.length === 0) return null;

    // Random fair selection between the two prizes in the tier
    const randomIndex = Math.floor(Math.random() * tierPrizes.length);
    return tierPrizes[randomIndex];
};

/**
 * Get prize name in the specified language
 */
export const getPrizeName = (prize: Prize | null, language: Language): string | null => {
    if (!prize) return null;
    return prize.name[language] || prize.name.en;
};

/**
 * Full prize assignment workflow
 */
export const processPrizeAssignment = (
    correctAnswers: number,
    language: Language
): {
    prizeTier: number;
    prizeId: number | null;
    prizeName: string | null;
} => {
    const prizeTier = calculatePrizeTier(correctAnswers);
    const prize = assignPrize(prizeTier);

    return {
        prizeTier,
        prizeId: prize?.id ?? null,
        prizeName: getPrizeName(prize, language),
    };
};

/**
 * Get prize distribution statistics
 * Returns count of each prize tier awarded
 */
export const getPrizeStats = (submissions: { prize_tier: number }[]): Record<number, number> => {
    const stats: Record<number, number> = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 };

    submissions.forEach((s) => {
        if (s.prize_tier >= 0 && s.prize_tier <= 4) {
            stats[s.prize_tier]++;
        }
    });

    return stats;
};
