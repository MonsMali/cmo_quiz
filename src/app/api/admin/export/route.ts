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

        // Check Supabase configuration
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        if (!supabaseUrl || supabaseUrl === 'your_supabase_project_url') {
            // Demo mode - return sample CSV
            const csvContent = 'id,name,email,quiz_id,correct_answers,prize_tier,prize_id,prize_awarded,language,nationality_inferred,timestamp,ip_address,marketing_consent\n' +
                'demo-1,Demo User,demo@example.com,1,3,3,5,Prize 5,en,Other / English-speaking (inferred),2026-01-12T22:00:00Z,127.0.0.1,true';

            return new NextResponse(csvContent, {
                headers: {
                    'Content-Type': 'text/csv',
                    'Content-Disposition': `attachment; filename=quiz-submissions-${new Date().toISOString().split('T')[0]}.csv`,
                },
            });
        }

        const supabase = createServerClient();

        if (!supabase) {
            return NextResponse.json(
                { error: 'Database not configured' },
                { status: 500 }
            );
        }

        // Fetch all submissions
        const { data: submissions, error } = await supabase
            .from('submissions')
            .select('*')
            .order('timestamp', { ascending: false });

        if (error) {
            console.error('Database query error:', error);
            return NextResponse.json(
                { error: 'Failed to fetch submissions' },
                { status: 500 }
            );
        }

        // Convert to CSV
        const headers = [
            'id',
            'name',
            'email',
            'quiz_id',
            'correct_answers',
            'prize_tier',
            'prize_id',
            'prize_awarded',
            'language',
            'nationality_inferred',
            'timestamp',
            'ip_address',
            'marketing_consent',
        ];

        const csvRows = [headers.join(',')];

        submissions?.forEach((s) => {
            const row = headers.map((header) => {
                const value = s[header];
                // Escape quotes and wrap in quotes if contains comma
                if (value === null || value === undefined) return '';
                const stringValue = String(value);
                if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
                    return `"${stringValue.replace(/"/g, '""')}"`;
                }
                return stringValue;
            });
            csvRows.push(row.join(','));
        });

        const csvContent = csvRows.join('\n');

        return new NextResponse(csvContent, {
            headers: {
                'Content-Type': 'text/csv',
                'Content-Disposition': `attachment; filename=quiz-submissions-${new Date().toISOString().split('T')[0]}.csv`,
            },
        });
    } catch (error) {
        console.error('Export error:', error);
        return NextResponse.json(
            { error: 'An unexpected error occurred' },
            { status: 500 }
        );
    }
}
