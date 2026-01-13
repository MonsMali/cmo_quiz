import { NextRequest, NextResponse } from 'next/server';
import { Language, UserAnswer } from '@/types';
import { getQuizById } from '@/data/quizzes';
import { calculateCorrectAnswers, isAnswerCorrect } from '@/lib/quizLogic';
import { processPrizeAssignment } from '@/lib/prizeLogic';
import { nationalityFromLanguage } from '@/data/translations';
import { isGoogleSheetsConfigured, checkEmailExists, addSubmission } from '@/lib/googleSheets';

interface SubmitRequestBody {
    name: string;
    email: string;
    quizId: number;
    answers: { questionId: string; selectedIndex: number }[];
    language: Language;
    gdprAccepted: boolean;
}

export async function POST(request: NextRequest) {
    try {
        const body: SubmitRequestBody = await request.json();
        const { name, email, quizId, answers, language, gdprAccepted } = body;

        // Validate required fields
        if (!name || !name.trim()) {
            return NextResponse.json(
                { error: 'Name is required', code: 'NAME_REQUIRED' },
                { status: 400 }
            );
        }

        if (!email || !email.trim()) {
            return NextResponse.json(
                { error: 'Email is required', code: 'EMAIL_REQUIRED' },
                { status: 400 }
            );
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Invalid email format', code: 'EMAIL_INVALID' },
                { status: 400 }
            );
        }

        // Get quiz to validate answers
        const quiz = getQuizById(quizId);
        if (!quiz) {
            return NextResponse.json(
                { error: 'Invalid quiz ID', code: 'INVALID_QUIZ' },
                { status: 400 }
            );
        }

        // Validate answers
        if (!answers || answers.length !== 4) {
            return NextResponse.json(
                { error: 'Must answer all 4 questions', code: 'INCOMPLETE_ANSWERS' },
                { status: 400 }
            );
        }

        // Process answers and calculate score
        const processedAnswers: UserAnswer[] = answers.map((a) => ({
            questionId: a.questionId,
            selectedIndex: a.selectedIndex,
            isCorrect: isAnswerCorrect(quiz, a.questionId, a.selectedIndex),
        }));

        const correctAnswers = calculateCorrectAnswers(processedAnswers);

        // Calculate prize
        const { prizeTier, prizeId, prizeName } = processPrizeAssignment(
            correctAnswers,
            language
        );

        // Get IP address (for analytics)
        const forwardedFor = request.headers.get('x-forwarded-for');
        const ipAddress = forwardedFor ? forwardedFor.split(',')[0].trim() :
            request.headers.get('x-real-ip') ||
            'unknown';

        // Infer nationality from language
        const nationalityInferred = nationalityFromLanguage[language] || 'Unknown';

        // Check if Google Sheets is configured
        if (!isGoogleSheetsConfigured()) {
            // Development mode - return success without database
            console.log('Google Sheets not configured - running in demo mode');
            return NextResponse.json({
                success: true,
                correctAnswers,
                prizeTier,
                prizeId,
                prizeName,
                demo: true,
            });
        }

        // Check for duplicate email
        const emailExists = await checkEmailExists(email.toLowerCase().trim());
        if (emailExists) {
            return NextResponse.json(
                { error: 'Email already participated', code: 'DUPLICATE_EMAIL' },
                { status: 409 }
            );
        }

        // Save submission to Google Sheets
        const result = await addSubmission({
            name: name.trim(),
            email: email.toLowerCase().trim(),
            quiz_id: quizId,
            questions_answered: processedAnswers,
            correct_answers: correctAnswers,
            prize_tier: prizeTier,
            prize_id: prizeId,
            prize_awarded: prizeName,
            language,
            ip_address: ipAddress,
            nationality_inferred: nationalityInferred,
            gdpr_accepted: gdprAccepted,
        });

        if (!result.success) {
            if (result.code === 'DUPLICATE_EMAIL') {
                return NextResponse.json(
                    { error: 'Email already participated', code: 'DUPLICATE_EMAIL' },
                    { status: 409 }
                );
            }
            console.error('Google Sheets insert error:', result.error);
            return NextResponse.json(
                { error: 'Failed to save submission', code: 'DATABASE_ERROR' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            correctAnswers,
            prizeTier,
            prizeId,
            prizeName,
        });
    } catch (error) {
        console.error('Submit error:', error);
        return NextResponse.json(
            { error: 'An unexpected error occurred', code: 'INTERNAL_ERROR' },
            { status: 500 }
        );
    }
}
