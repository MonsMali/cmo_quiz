import { NextRequest, NextResponse } from 'next/server';
import { Language, UserAnswer } from '@/types';
import { calculateCorrectAnswers } from '@/lib/quizLogic';
import { calculatePrizeTier, applyDailyLimits, assignPrize, getPrizeName } from '@/lib/prizeLogic';
import { nationalityFromLanguage } from '@/data/translations';
import { isGoogleSheetsConfigured, checkEmailExists, addSubmission, getTodayPrizeCounts } from '@/lib/googleSheets';
import { getQuestionById } from '@/lib/cache';
import { isValidEmail } from '@/lib/emailValidation';

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

        // Email validation (shared rules with client)
        if (!isValidEmail(email)) {
            return NextResponse.json(
                { error: 'Invalid email address', code: 'EMAIL_INVALID' },
                { status: 400 }
            );
        }

        // Validate GDPR consent
        if (!gdprAccepted) {
            return NextResponse.json(
                { error: 'GDPR consent is required', code: 'GDPR_REQUIRED' },
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
        // CACHING OPTIMIZATION: Use O(1) Map lookup instead of O(n) array find
        // Uses cached getQuestionById from @/lib/cache for per-request deduplication
        const processedAnswers: UserAnswer[] = answers.map((a) => {
            const question = getQuestionById(a.questionId);
            if (!question) {
                return {
                    questionId: a.questionId,
                    selectedIndex: a.selectedIndex,
                    isCorrect: false,
                };
            }
            return {
                questionId: a.questionId,
                selectedIndex: a.selectedIndex,
                isCorrect: question.correctIndex === a.selectedIndex,
            };
        });

        const correctAnswers = calculateCorrectAnswers(processedAnswers);

        // Calculate earned prize tier based on correct answers
        const earnedTier = calculatePrizeTier(correctAnswers);

        // Get IP address (for analytics) - sync operation, do first
        const forwardedFor = request.headers.get('x-forwarded-for');
        const ipAddress = forwardedFor ? forwardedFor.split(',')[0].trim() :
            request.headers.get('x-real-ip') ||
            'unknown';

        // Infer nationality from language
        const nationalityInferred = nationalityFromLanguage[language] || 'Unknown';

        // Check if Google Sheets is configured
        if (!isGoogleSheetsConfigured()) {
            // Development mode - return success without database
            const todayCounts = { 1: 0, 2: 0, 3: 0, 4: 0 };
            const finalTier = applyDailyLimits(earnedTier, todayCounts);
            const prize = assignPrize(finalTier);
            const prizeName = getPrizeName(prize, language);
            return NextResponse.json({
                success: true,
                correctAnswers,
                prizeTier: finalTier,
                prizeId: prize?.id ?? null,
                prizeName,
                demo: true,
            });
        }

        // WATERFALL OPTIMIZATION: Run independent async operations in parallel
        const [todayCounts, emailExists] = await Promise.all([
            getTodayPrizeCounts(),
            checkEmailExists(email.toLowerCase().trim())
        ]);

        // Check for duplicate email (using result from parallel fetch)
        if (emailExists) {
            return NextResponse.json(
                { error: 'Email already participated', code: 'DUPLICATE_EMAIL' },
                { status: 409 }
            );
        }

        // Apply daily limits with automatic fallback
        const finalTier = applyDailyLimits(earnedTier, todayCounts);

        // Assign a random prize from the final tier
        const prize = assignPrize(finalTier);
        const prizeName = getPrizeName(prize, language);

        // Save submission to Google Sheets
        const result = await addSubmission({
            name: name.trim(),
            email: email.toLowerCase().trim(),
            quiz_id: quizId,
            questions_answered: processedAnswers,
            correct_answers: correctAnswers,
            prize_tier: finalTier,
            prize_id: prize?.id ?? null,
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
            prizeTier: finalTier,
            prizeId: prize?.id ?? null,
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
