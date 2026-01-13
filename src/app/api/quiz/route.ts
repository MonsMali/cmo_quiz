import { NextRequest, NextResponse } from 'next/server';
import { assignRandomQuiz } from '@/lib/quizLogic';

export async function GET(request: NextRequest) {
    try {
        // Get a random quiz with even distribution
        const quiz = assignRandomQuiz();

        // Generate a session ID for tracking
        const sessionId = crypto.randomUUID();

        return NextResponse.json({
            quiz,
            sessionId,
        });
    } catch (error) {
        console.error('Error getting quiz:', error);
        return NextResponse.json(
            { error: 'Failed to get quiz' },
            { status: 500 }
        );
    }
}
