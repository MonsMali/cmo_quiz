import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Check if Supabase is configured
export const isSupabaseConfigured = (): boolean => {
    return !!(supabaseUrl && supabaseAnonKey && supabaseUrl !== 'your_supabase_project_url');
};

// Client-side Supabase client (returns null if not configured)
export const supabase: SupabaseClient | null = isSupabaseConfigured()
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

// Server-side client with service role (for admin operations)
export const createServerClient = (): SupabaseClient | null => {
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
    if (!supabaseUrl || !serviceRoleKey || supabaseUrl === 'your_supabase_project_url') {
        return null;
    }
    return createClient(supabaseUrl, serviceRoleKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false,
        },
    });
};
