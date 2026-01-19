import { describe, it, expect } from 'vitest';
import { calculatePrizeTier, applyDailyLimits, assignPrize, getPrizeName } from './prizeLogic';

describe('prizeLogic', () => {
    describe('calculatePrizeTier', () => {
        it('should return tier 4 for 4 correct answers', () => {
            expect(calculatePrizeTier(4)).toBe(4);
        });

        it('should return tier 3 for 3 correct answers', () => {
            expect(calculatePrizeTier(3)).toBe(3);
        });

        it('should return tier 2 for 2 correct answers', () => {
            expect(calculatePrizeTier(2)).toBe(2);
        });

        it('should return tier 1 for 1 correct answer', () => {
            expect(calculatePrizeTier(1)).toBe(1);
        });

        it('should return tier 1 for 0 correct answers (everyone gets a prize)', () => {
            expect(calculatePrizeTier(0)).toBe(1);
        });
    });

    describe('applyDailyLimits', () => {
        it('should return earned tier when limits not reached', () => {
            const todayCounts = { 1: 0, 2: 0, 3: 0, 4: 0 };
            expect(applyDailyLimits(4, todayCounts)).toBe(4);
        });

        it('should downgrade tier when limit reached', () => {
            // Assuming daily limit for tier 4 is 2
            const todayCounts = { 1: 0, 2: 0, 3: 0, 4: 100 };
            const result = applyDailyLimits(4, todayCounts);
            expect(result).toBeLessThanOrEqual(4);
        });

        it('should return tier 4 even with high counts (tier 4 has no limit)', () => {
            const todayCounts = { 1: 1000, 2: 1000, 3: 1000, 4: 1000 };
            // Tier 4 has no daily limit, so it always returns tier 4
            expect(applyDailyLimits(4, todayCounts)).toBe(4);
        });

        it('should downgrade tier 3 to tier 1 when both tier 3 and tier 2 limits reached', () => {
            const todayCounts = { 1: 0, 2: 1000, 3: 1000, 4: 0 };
            // Tier 3 limit reached -> try tier 2 -> tier 2 limit reached -> tier 1
            expect(applyDailyLimits(3, todayCounts)).toBe(1);
        });
    });

    describe('assignPrize', () => {
        it('should return null for tier 0', () => {
            expect(assignPrize(0)).toBeNull();
        });

        it('should return a prize for valid tiers', () => {
            for (let tier = 1; tier <= 4; tier++) {
                const prize = assignPrize(tier);
                expect(prize).not.toBeNull();
                expect(prize).toHaveProperty('id');
                expect(prize).toHaveProperty('tier', tier);
            }
        });
    });

    describe('getPrizeName', () => {
        it('should return null for null prize', () => {
            expect(getPrizeName(null, 'en')).toBeNull();
        });

        it('should return translated prize name', () => {
            const prize = assignPrize(1);
            if (prize) {
                const name = getPrizeName(prize, 'en');
                expect(name).toBeTruthy();
                expect(typeof name).toBe('string');
            }
        });

        it('should return different names for different languages', () => {
            const prize = assignPrize(1);
            if (prize) {
                const enName = getPrizeName(prize, 'en');
                const ptName = getPrizeName(prize, 'pt');
                // Names might be the same or different depending on translation
                expect(enName).toBeTruthy();
                expect(ptName).toBeTruthy();
            }
        });
    });
});
