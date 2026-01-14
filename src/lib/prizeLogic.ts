import { Language, Prize } from '@/types';
import { prizes, getPrizesByTier, DAILY_LIMITS } from '@/data/prizes';

/**
 * Calculate prize tier based on correct answers
 * 0-1 correct = tier 1 (pen - prizes 1-2)
 * 2 correct = tier 2 (notebook/lunch box - prizes 3-4)
 * 3 correct = tier 3 (travel bag/beach tennis - prizes 5-6)
 * 4 correct = tier 4 (special prize - prizes 7-8)
 */
export const calculatePrizeTier = (correctAnswers: number): number => {
    if (correctAnswers < 0 || correctAnswers > 4) {
        throw new Error('Correct answers must be between 0 and 4');
    }
    // 0 or 1 correct = tier 1
    if (correctAnswers <= 1) return 1;
    // Otherwise return the number of correct answers as tier
    return correctAnswers;
};

/**
 * Assign a random prize from the appropriate tier
 */
export const assignPrize = (prizeTier: number): Prize | null => {
    const tierPrizes = getPrizesByTier(prizeTier);
    if (tierPrizes.length === 0) return null;

    // Random fair selection between the prizes in the tier
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
    const stats: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0 };

    submissions.forEach((s) => {
        if (s.prize_tier >= 1 && s.prize_tier <= 4) {
            stats[s.prize_tier]++;
        }
    });

    return stats;
};

/**
 * Apply daily prize limits with automatic fallback
 * If a tier has reached its daily limit, downgrade to the next lower tier
 *
 * @param earnedTier - The tier the user earned based on correct answers
 * @param todayCounts - Count of prizes awarded today by tier
 * @returns The actual tier to award (may be lower due to limits)
 */
export const applyDailyLimits = (
    earnedTier: number,
    todayCounts: Record<number, number>
): number => {
    let finalTier = earnedTier;

    // Check tier 3 limit (15/day)
    if (earnedTier === 3) {
        const limit = DAILY_LIMITS[3];
        if (limit && todayCounts[3] >= limit) {
            console.log(`Tier 3 limit reached (${todayCounts[3]}/${limit}), downgrading to Tier 2`);
            finalTier = 2;
        }
    }

    // Check tier 2 limit (40/day) - could be original or downgraded
    if (finalTier === 2) {
        const limit = DAILY_LIMITS[2];
        if (limit && todayCounts[2] >= limit) {
            console.log(`Tier 2 limit reached (${todayCounts[2]}/${limit}), downgrading to Tier 1`);
            finalTier = 1;
        }
    }

    // Tier 1 and 4 have no limits, so return as-is
    return finalTier;
};
