import { Prize } from '@/types';

// Prize catalog - Update names when actual prizes are determined
export const prizes: Prize[] = [
    // Tier 1 (1 correct answer)
    {
        id: 1,
        tier: 1,
        name: {
            pt: 'Prémio 1 - Brinde Olhão',
            es: 'Premio 1 - Regalo Olhão',
            fr: 'Prix 1 - Cadeau Olhão',
            de: 'Preis 1 - Olhão Geschenk',
            en: 'Prize 1 - Olhão Gift',
        },
    },
    {
        id: 2,
        tier: 1,
        name: {
            pt: 'Prémio 2 - Brinde Olhão',
            es: 'Premio 2 - Regalo Olhão',
            fr: 'Prix 2 - Cadeau Olhão',
            de: 'Preis 2 - Olhão Geschenk',
            en: 'Prize 2 - Olhão Gift',
        },
    },
    // Tier 2 (2 correct answers)
    {
        id: 3,
        tier: 2,
        name: {
            pt: 'Prémio 3 - Brinde Olhão',
            es: 'Premio 3 - Regalo Olhão',
            fr: 'Prix 3 - Cadeau Olhão',
            de: 'Preis 3 - Olhão Geschenk',
            en: 'Prize 3 - Olhão Gift',
        },
    },
    {
        id: 4,
        tier: 2,
        name: {
            pt: 'Prémio 4 - Brinde Olhão',
            es: 'Premio 4 - Regalo Olhão',
            fr: 'Prix 4 - Cadeau Olhão',
            de: 'Preis 4 - Olhão Geschenk',
            en: 'Prize 4 - Olhão Gift',
        },
    },
    // Tier 3 (3 correct answers)
    {
        id: 5,
        tier: 3,
        name: {
            pt: 'Prémio 5 - Brinde Olhão',
            es: 'Premio 5 - Regalo Olhão',
            fr: 'Prix 5 - Cadeau Olhão',
            de: 'Preis 5 - Olhão Geschenk',
            en: 'Prize 5 - Olhão Gift',
        },
    },
    {
        id: 6,
        tier: 3,
        name: {
            pt: 'Prémio 6 - Brinde Olhão',
            es: 'Premio 6 - Regalo Olhão',
            fr: 'Prix 6 - Cadeau Olhão',
            de: 'Preis 6 - Olhão Geschenk',
            en: 'Prize 6 - Olhão Gift',
        },
    },
    // Tier 4 (4 correct answers - all correct!)
    {
        id: 7,
        tier: 4,
        name: {
            pt: 'Prémio 7 - Brinde Especial Olhão',
            es: 'Premio 7 - Regalo Especial Olhão',
            fr: 'Prix 7 - Cadeau Spécial Olhão',
            de: 'Preis 7 - Olhão Spezialgeschenk',
            en: 'Prize 7 - Olhão Special Gift',
        },
    },
    {
        id: 8,
        tier: 4,
        name: {
            pt: 'Prémio 8 - Brinde Especial Olhão',
            es: 'Premio 8 - Regalo Especial Olhão',
            fr: 'Prix 8 - Cadeau Spécial Olhão',
            de: 'Preis 8 - Olhão Spezialgeschenk',
            en: 'Prize 8 - Olhão Special Gift',
        },
    },
];

export const getPrizesByTier = (tier: number): Prize[] => {
    return prizes.filter((p) => p.tier === tier);
};

export const getPrizeById = (id: number): Prize | undefined => {
    return prizes.find((p) => p.id === id);
};
