import { NextRequest, NextResponse } from 'next/server';
import { createSession, destroySession } from '@/lib/adminAuth';

export async function POST(request: NextRequest) {
    try {
        const { password } = await request.json();
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (!adminPassword) {
            return NextResponse.json(
                { error: 'Admin password not configured' },
                { status: 500 }
            );
        }

        if (password !== adminPassword) {
            return NextResponse.json(
                { error: 'Invalid password' },
                { status: 401 }
            );
        }

        await createSession();

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { error: 'Login failed' },
            { status: 500 }
        );
    }
}

export async function DELETE() {
    try {
        await destroySession();
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json(
            { error: 'Logout failed' },
            { status: 500 }
        );
    }
}
