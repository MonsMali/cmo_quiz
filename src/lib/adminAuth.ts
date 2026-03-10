import { cookies } from 'next/headers';

/**
 * Server-side session store for admin authentication.
 * Tokens are stored in memory — they reset on server restart,
 * which is acceptable for a single-instance Vercel deployment.
 */
const validSessions = new Set<string>();

const COOKIE_NAME = 'admin_session';
const SESSION_MAX_AGE = 60 * 60 * 24; // 24 hours

/**
 * Create a new admin session and set the cookie.
 */
export async function createSession(): Promise<void> {
    const token = crypto.randomUUID();
    validSessions.add(token);

    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: SESSION_MAX_AGE,
        path: '/',
    });
}

/**
 * Verify the current request has a valid admin session.
 */
export async function isAuthenticated(): Promise<boolean> {
    const cookieStore = await cookies();
    const session = cookieStore.get(COOKIE_NAME);

    if (!session) return false;
    return validSessions.has(session.value);
}

/**
 * Destroy the current admin session.
 */
export async function destroySession(): Promise<void> {
    const cookieStore = await cookies();
    const session = cookieStore.get(COOKIE_NAME);

    if (session) {
        validSessions.delete(session.value);
    }

    cookieStore.delete(COOKIE_NAME);
}
