import { Prize } from '@/types';

// Prize catalog with daily limits - B-Travel Barcelona 2026
// Tier 1 (0-1 correct): Pen - No limit
// Tier 2 (2 correct): Key Holder - 40/day limit
// Tier 3 (3 correct): Notepad/Necessaire - 15/day limit
// Tier 4 (4 correct): Serrated Bag/Tasting - No automated limit (staff manages)

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
    // Tier 2 (2 correct answers) - Key Holder (40/day limit)
    {
        id: 3,
        tier: 2,
        name: {
            pt: 'Porta-chaves de Olhão',
            es: 'Llavero de Olhão',
            fr: 'Porte-clés d\'Olhão',
            de: 'Olhão Schlüsselanhänger',
            en: 'Olhão Key Holder',
        },
    },
    {
        id: 4,
        tier: 2,
        name: {
            pt: 'Porta-chaves de Olhão',
            es: 'Llavero de Olhão',
            fr: 'Porte-clés d\'Olhão',
            de: 'Olhão Schlüsselanhänger',
            en: 'Olhão Key Holder',
        },
    },
    // Tier 3 (3 correct answers) - Notepad & Necessaire (15/day limit)
    {
        id: 5,
        tier: 3,
        name: {
            pt: 'Bloco de Notas de Olhão',
            es: 'Bloc de Notas de Olhão',
            fr: 'Bloc-notes d\'Olhão',
            de: 'Olhão Notizblock',
            en: 'Olhão Notepad',
        },
    },
    {
        id: 6,
        tier: 3,
        name: {
            pt: 'Necessaire de Olhão',
            es: 'Neceser de Olhão',
            fr: 'Trousse de toilette d\'Olhão',
            de: 'Olhão Kulturbeutel',
            en: 'Olhão Toiletry Bag',
        },
    },
    // Tier 4 (4 correct answers - all correct!) - Serrated Bag & Tasting
    {
        id: 7,
        tier: 4,
        name: {
            pt: 'Saco Serrilhado de Olhão',
            es: 'Bolsa Serrada de Olhão',
            fr: 'Sac Dentelé d\'Olhão',
            de: 'Olhão Gezackte Tasche',
            en: 'Olhão Serrated Bag',
        },
    },
    {
        id: 8,
        tier: 4,
        name: {
            pt: 'Degustação de Olhão',
            es: 'Degustación de Olhão',
            fr: 'Dégustation d\'Olhão',
            de: 'Olhão Verkostung',
            en: 'Olhão Tasting',
        },
    },
];

// Daily prize limits by tier
export const DAILY_LIMITS: Record<number, number | null> = {
    1: null,  // No limit for Tier 1 (pens)
    2: 40,    // 40 per day for Tier 2 (key holders)
    3: 15,    // 15 per day for Tier 3 (notepads/necessaires)
    4: null,  // No automated limit for Tier 4 (serrated bag/tasting - staff manages)
};

export const getPrizesByTier = (tier: number): Prize[] => {
    return prizes.filter((p) => p.tier === tier);
};

export const getPrizeById = (id: number): Prize | undefined => {
    return prizes.find((p) => p.id === id);
};
