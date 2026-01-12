import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createServerClient } from '@/lib/supabase';

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
        const language = searchParams.get('language');
        const quizId = searchParams.get('quizId');
        const prizeTier = searchParams.get('prizeTier');
        const startDate = searchParams.get('startDate');
        const endDate = searchParams.get('endDate');

        // Check Supabase configuration
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        if (!supabaseUrl || supabaseUrl === 'your_supabase_project_url') {
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
                        marketing_consent: true,
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

        const supabase = createServerClient();

        if (!supabase) {
            return NextResponse.json(
                { error: 'Database not configured' },
                { status: 500 }
            );
        }

        // Build query
        let query = supabase
            .from('submissions')
            .select('*')
            .order('timestamp', { ascending: false });

        // Apply filters
        if (language && language !== 'all') {
            query = query.eq('language', language);
        }
        if (quizId && quizId !== 'all') {
            query = query.eq('quiz_id', parseInt(quizId));
        }
        if (prizeTier && prizeTier !== 'all') {
            query = query.eq('prize_tier', parseInt(prizeTier));
        }
        if (startDate) {
            query = query.gte('timestamp', startDate);
        }
        if (endDate) {
            query = query.lte('timestamp', endDate);
        }

        const { data: submissions, error } = await query;

        if (error) {
            console.error('Database query error:', error);
            return NextResponse.json(
                { error: 'Failed to fetch submissions' },
                { status: 500 }
            );
        }

        // Calculate statistics
        const stats = {
            totalSubmissions: submissions?.length || 0,
            submissionsByLanguage: { pt: 0, es: 0, fr: 0, de: 0, en: 0 } as Record<string, number>,
            submissionsByPrizeTier: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 } as Record<number, number>,
            averageCorrectAnswers: 0,
        };

        if (submissions && submissions.length > 0) {
            let totalCorrect = 0;
            submissions.forEach((s) => {
                // Count by language
                if (s.language in stats.submissionsByLanguage) {
                    stats.submissionsByLanguage[s.language]++;
                }
                // Count by prize tier
                if (s.prize_tier in stats.submissionsByPrizeTier) {
                    stats.submissionsByPrizeTier[s.prize_tier]++;
                }
                // Sum correct answers
                totalCorrect += s.correct_answers || 0;
            });
            stats.averageCorrectAnswers = totalCorrect / submissions.length;
        }

        return NextResponse.json({
            submissions: submissions || [],
            stats,
        });
    } catch (error) {
        console.error('Submissions fetch error:', error);
        return NextResponse.json(
            { error: 'An unexpected error occurred' },
            { status: 500 }
        );
    }
}
