import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { isGoogleSheetsConfigured, getSubmissions } from '@/lib/googleSheets';

// Verify admin session
async function isAuthenticated(): Promise<boolean> {
    const cookieStore = await cookies();
    const session = cookieStore.get('admin_session');
    const token = cookieStore.get('admin_token');

    if (!session || !token) return false;
    return session.value === token.value;
}

export async function GET(request: NextRequest) {
    try {
        // Check authentication
        if (!(await isAuthenticated())) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Get query parameters for filtering
        const { searchParams } = new URL(request.url);
        const language = searchParams.get('language') || undefined;
        const quizId = searchParams.get('quizId') || undefined;
        const prizeTier = searchParams.get('prizeTier') || undefined;

        // Check Google Sheets configuration
        if (!isGoogleSheetsConfigured()) {
            // Demo mode - return sample data
            return NextResponse.json({
                submissions: [
                    {
                        id: 'demo-1',
                        name: 'Demo User',
                        email: 'demo@example.com',
                        quiz_id: 1,
                        correct_answers: 3,
                        prize_tier: 3,
                        prize_id: 5,
                        prize_awarded: 'Prize 5',
                        language: 'en',
                        nationality_inferred: 'Other / English-speaking (inferred)',
                        timestamp: new Date().toISOString(),
                        ip_address: '127.0.0.1',
                        gdpr_accepted: true,
                    },
                ],
                stats: {
                    totalSubmissions: 1,
                    submissionsByLanguage: { pt: 0, es: 0, fr: 0, de: 0, en: 1 },
                    submissionsByPrizeTier: { 0: 0, 1: 0, 2: 0, 3: 1, 4: 0 },
                    averageCorrectAnswers: 3,
                },
                demo: true,
            });
        }

        // Fetch from Google Sheets
        const result = await getSubmissions({ language, quizId, prizeTier });

        if (!result) {
            return NextResponse.json(
                { error: 'Failed to fetch submissions' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            submissions: result.submissions,
            stats: result.stats,
        });
    } catch (error) {
        console.error('Submissions fetch error:', error);
        return NextResponse.json(
            { error: 'An unexpected error occurred' },
            { status: 500 }
        );
    }
}
