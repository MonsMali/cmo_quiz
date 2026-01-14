import { Prize } from '@/types';

// Prize catalog with daily limits
// Tier 1 (0-1 correct): Pen - No limit (43/day available)
// Tier 2 (2 correct): Notebook/Lunch Box - 40/day limit
// Tier 3 (3 correct): Airplane Bag/Beach Tennis - 15/day limit
// Tier 4 (4 correct): Special Prize - No automated limit (staff manages)

export const prizes: Prize[] = [
    // Tier 1 (0-1 correct answer) - Pen
    {
        id: 1,
        tier: 1,
        name: {
            pt: 'Caneta de Olhão',
            es: 'Bolígrafo de Olhão',
            fr: 'Stylo d\'Olhão',
            de: 'Olhão Kugelschreiber',
            en: 'Olhão Pen',
        },
    },
    {
        id: 2,
        tier: 1,
        name: {
            pt: 'Caneta de Olhão',
            es: 'Bolígrafo de Olhão',
            fr: 'Stylo d\'Olhão',
            de: 'Olhão Kugelschreiber',
            en: 'Olhão Pen',
        },
    },
    // Tier 2 (2 correct answers) - Notebook & Lunch Box (40/day limit)
    {
        id: 3,
        tier: 2,
        name: {
            pt: 'Caderno de Olhão',
            es: 'Cuaderno de Olhão',
            fr: 'Carnet d\'Olhão',
            de: 'Olhão Notizbuch',
            en: 'Olhão Notebook',
        },
    },
    {
        id: 4,
        tier: 2,
        name: {
            pt: 'Lancheira de Olhão',
            es: 'Fiambrera de Olhão',
            fr: 'Boîte à lunch d\'Olhão',
            de: 'Olhão Lunchbox',
            en: 'Olhão Lunch Box',
        },
    },
    // Tier 3 (3 correct answers) - Airplane Bag & Beach Tennis (15/day limit)
    {
        id: 5,
        tier: 3,
        name: {
            pt: 'Saco de Viagem de Olhão',
            es: 'Bolsa de Viaje de Olhão',
            fr: 'Sac de Voyage d\'Olhão',
            de: 'Olhão Reisetasche',
            en: 'Olhão Travel Bag',
        },
    },
    {
        id: 6,
        tier: 3,
        name: {
            pt: 'Raquetes de Ténis de Praia de Olhão',
            es: 'Raquetas de Tenis de Playa de Olhão',
            fr: 'Raquettes de Tennis de Plage d\'Olhão',
            de: 'Olhão Beachtennis-Schläger',
            en: 'Olhão Beach Tennis Rackets',
        },
    },
    // Tier 4 (4 correct answers - all correct!) - Special Prize (No limit)
    {
        id: 7,
        tier: 4,
        name: {
            pt: 'Prémio Especial',
            es: 'Premio Especial',
            fr: 'Prix Spécial',
            de: 'Sonderpreis',
            en: 'Special Prize',
        },
    },
    {
        id: 8,
        tier: 4,
        name: {
            pt: 'Prémio Especial',
            es: 'Premio Especial',
            fr: 'Prix Spécial',
            de: 'Sonderpreis',
            en: 'Special Prize',
        },
    },
];

// Daily prize limits by tier
export const DAILY_LIMITS: Record<number, number | null> = {
    1: null,  // No limit for Tier 1 (pens)
    2: 40,    // 40 per day for Tier 2 (notebooks/lunch boxes)
    3: 15,    // 15 per day for Tier 3 (bags/rackets)
    4: null,  // No automated limit for Tier 4 (special prize - staff manages)
};

export const getPrizesByTier = (tier: number): Prize[] => {
    return prizes.filter((p) => p.tier === tier);
};

export const getPrizeById = (id: number): Prize | undefined => {
    return prizes.find((p) => p.id === id);
};
