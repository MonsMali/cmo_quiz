/**
 * Google Sheets API client using Apps Script Web App
 */

const GOOGLE_SHEETS_URL = process.env.GOOGLE_SHEETS_URL;

export interface SheetSubmission {
    id?: string;
    timestamp?: string;
    name: string;
    email: string;
    quiz_id: number;
    correct_answers: number;
    prize_tier: number;
    prize_id: number | null;
    prize_awarded: string | null;
    language: string;
    nationality_inferred: string;
    ip_address: string;
    gdpr_accepted: boolean;
    questions_answered: Array<{
        questionId: string;
        selectedIndex: number;
        isCorrect: boolean;
    }>;
}

export interface SheetStats {
    totalSubmissions: number;
    submissionsByLanguage: Record<string, number>;
    submissionsByPrizeTier: Record<number, number>;
    averageCorrectAnswers: number;
}

/**
 * Check if Google Sheets is configured
 */
export function isGoogleSheetsConfigured(): boolean {
    return !!GOOGLE_SHEETS_URL && GOOGLE_SHEETS_URL !== 'your_google_sheets_url';
}

/**
 * Check if an email has already been used
 */
export async function checkEmailExists(email: string): Promise<boolean> {
    if (!isGoogleSheetsConfigured()) {
        return false;
    }

    try {
        const url = `${GOOGLE_SHEETS_URL}?action=checkEmail&email=${encodeURIComponent(email)}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
        });

        if (!response.ok) {
            console.error('Email check failed:', response.status);
            return false;
        }

        const data = await response.json();
        return data.exists === true;
    } catch (error) {
        console.error('Error checking email:', error);
        return false;
    }
}

/**
 * Add a new submission to Google Sheets
 */
export async function addSubmission(submission: Omit<SheetSubmission, 'id' | 'timestamp'>): Promise<{ success: boolean; error?: string; code?: string }> {
    if (!isGoogleSheetsConfigured()) {
        return { success: false, error: 'Google Sheets not configured' };
    }

    try {
        const response = await fetch(GOOGLE_SHEETS_URL!, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(submission),
        });

        const data = await response.json();

        if (!response.ok || data.error) {
            return {
                success: false,
                error: data.error || 'Failed to save submission',
                code: data.code,
            };
        }

        return { success: true };
    } catch (error) {
        console.error('Error adding submission:', error);
        return { success: false, error: 'Network error' };
    }
}

/**
 * Get all submissions with optional filters
 */
export async function getSubmissions(filters?: {
    language?: string;
    quizId?: string;
    prizeTier?: string;
}): Promise<{ submissions: SheetSubmission[]; stats: SheetStats } | null> {
    if (!isGoogleSheetsConfigured()) {
        return null;
    }

    try {
        const params = new URLSearchParams({ action: 'getAll' });
        if (filters?.language) params.append('language', filters.language);
        if (filters?.quizId) params.append('quizId', filters.quizId);
        if (filters?.prizeTier) params.append('prizeTier', filters.prizeTier);

        const url = `${GOOGLE_SHEETS_URL}?${params.toString()}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
        });

        if (!response.ok) {
            console.error('Failed to fetch submissions:', response.status);
            return null;
        }

        const data = await response.json();
        return {
            submissions: data.submissions || [],
            stats: data.stats || {
                totalSubmissions: 0,
                submissionsByLanguage: { pt: 0, es: 0, fr: 0, de: 0, en: 0 },
                submissionsByPrizeTier: { 1: 0, 2: 0, 3: 0, 4: 0 },
                averageCorrectAnswers: 0,
            },
        };
    } catch (error) {
        console.error('Error fetching submissions:', error);
        return null;
    }
}

/**
 * Get today's prize counts by tier for daily limit enforcement
 */
export async function getTodayPrizeCounts(): Promise<Record<number, number>> {
    if (!isGoogleSheetsConfigured()) {
        // Return empty counts if Google Sheets not configured
        return { 1: 0, 2: 0, 3: 0, 4: 0 };
    }

    try {
        const url = `${GOOGLE_SHEETS_URL}?action=getTodayCounts`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
        });

        if (!response.ok) {
            console.error('Failed to fetch today\'s counts:', response.status);
            return { 1: 0, 2: 0, 3: 0, 4: 0 };
        }

        const data = await response.json();
        // data.counts should be like { "1": 5, "2": 12, "3": 8, "4": 2 }
        return data.counts || { 1: 0, 2: 0, 3: 0, 4: 0 };
    } catch (error) {
        console.error('Error fetching today\'s prize counts:', error);
        return { 1: 0, 2: 0, 3: 0, 4: 0 };
    }
}
