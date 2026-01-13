// Language types
export type Language = 'pt' | 'es' | 'fr' | 'de' | 'en';

// Quiz types
export interface Question {
    id: string;
    text: {
        pt: string;
        es: string;
        fr: string;
        de: string;
        en: string;
    };
    options: {
        pt: string[];
        es: string[];
        fr: string[];
        de: string[];
        en: string[];
    };
    correctIndex: number; // 0-3
}

export interface Quiz {
    id: number;
    questions: Question[];
}

// User submission types
export interface UserAnswer {
    questionId: string;
    selectedIndex: number;
    isCorrect: boolean;
}

export interface SubmissionData {
    name: string;
    email: string;
    quizId: number;
    questionsAnswered: UserAnswer[];
    correctAnswers: number;
    prizeTier: number;
    prizeId: number | null;
    prizeAwarded: string | null;
    language: Language;
    marketingConsent: boolean;
}

export interface Submission extends SubmissionData {
    id: string;
    timestamp: string;
    ipAddress: string | null;
    nationalityInferred: string;
}

// Prize types
export interface Prize {
    id: number;
    tier: number;
    name: {
        pt: string;
        es: string;
        fr: string;
        de: string;
        en: string;
    };
}

// API response types
export interface QuizResponse {
    quiz: Quiz;
    sessionId: string;
}

export interface SubmitResponse {
    success: boolean;
    correctAnswers: number;
    prizeTier: number;
    prizeId: number | null;
    prizeName: string | null;
    error?: string;
}

// Admin types
export interface AdminStats {
    totalSubmissions: number;
    submissionsByLanguage: Record<Language, number>;
    submissionsByPrizeTier: Record<number, number>;
    averageCorrectAnswers: number;
    completionRate: number;
}
