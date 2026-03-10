import { NextResponse } from 'next/server';
import { assignRandomQuiz } from '@/lib/quizLogic';

export async function GET() {
    try {
        const quiz = assignRandomQuiz();

        return NextResponse.json({ quiz });
    } catch (error) {
        console.error('Error getting quiz:', error);
        return NextResponse.json(
            { error: 'Failed to get quiz' },
            { status: 500 }
        );
    }
}
