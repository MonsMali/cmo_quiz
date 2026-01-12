'use client';

import { useState, useEffect, useCallback } from 'react';
import { Language } from '@/types';

interface Submission {
    id: string;
    name: string;
    email: string;
    quiz_id: number;
    correct_answers: number;
    prize_tier: number;
    prize_id: number | null;
    prize_awarded: string | null;
    language: Language;
    nationality_inferred: string;
    timestamp: string;
    ip_address: string;
    marketing_consent: boolean;
}

interface Stats {
    totalSubmissions: number;
    submissionsByLanguage: Record<string, number>;
    submissionsByPrizeTier: Record<number, number>;
    averageCorrectAnswers: number;
}

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [stats, setStats] = useState<Stats | null>(null);
    const [isDemo, setIsDemo] = useState(false);

    // Filters
    const [languageFilter, setLanguageFilter] = useState('all');
    const [quizFilter, setQuizFilter] = useState('all');
    const [prizeFilter, setPrizeFilter] = useState('all');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setLoginError('');

        try {
            const response = await fetch('/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Login failed');
            }

            setIsAuthenticated(true);
            fetchSubmissions();
        } catch (err: unknown) {
            setLoginError(err instanceof Error ? err.message : 'Login failed');
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await fetch('/api/admin/login', { method: 'DELETE' });
        } catch (err) {
            console.error('Logout error:', err);
        }
        setIsAuthenticated(false);
        setSubmissions([]);
        setStats(null);
    };

    const fetchSubmissions = useCallback(async () => {
        setIsLoading(true);
        try {
            const params = new URLSearchParams();
            if (languageFilter !== 'all') params.set('language', languageFilter);
            if (quizFilter !== 'all') params.set('quizId', quizFilter);
            if (prizeFilter !== 'all') params.set('prizeTier', prizeFilter);

            const response = await fetch(`/api/admin/submissions?${params}`);
            if (!response.ok) {
                if (response.status === 401) {
                    setIsAuthenticated(false);
                    return;
                }
                throw new Error('Failed to fetch submissions');
            }

            const data = await response.json();
            setSubmissions(data.submissions);
            setStats(data.stats);
            setIsDemo(data.demo || false);
        } catch (err) {
            console.error('Error fetching submissions:', err);
        } finally {
            setIsLoading(false);
        }
    }, [languageFilter, quizFilter, prizeFilter]);

    useEffect(() => {
        if (isAuthenticated) {
            fetchSubmissions();
        }
    }, [isAuthenticated, fetchSubmissions]);

    const handleExport = async () => {
        try {
            const response = await fetch('/api/admin/export');
            if (!response.ok) throw new Error('Export failed');

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `quiz-submissions-${new Date().toISOString().split('T')[0]}.csv`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (err) {
            console.error('Export error:', err);
            alert('Export failed');
        }
    };

    // Login form
    if (!isAuthenticated) {
        return (
            <main className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-ocean-50 to-ocean-100">
                <div className="card max-w-sm w-full">
                    <h1 className="text-2xl font-bold text-ocean-800 mb-6 text-center">
                        Admin Dashboard
                    </h1>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-ocean-700 mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="input-field"
                                placeholder="Enter admin password"
                                disabled={isLoading}
                            />
                        </div>

                        {loginError && (
                            <p className="text-coral-500 text-sm">{loginError}</p>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading || !password}
                            className="btn-primary w-full"
                        >
                            {isLoading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>
                </div>
            </main>
        );
    }

    // Dashboard
    return (
        <main className="min-h-screen bg-gradient-to-br from-ocean-50 to-ocean-100 p-4 sm:p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-ocean-800">
                            Admin Dashboard
                        </h1>
                        {isDemo && (
                            <p className="text-sm text-amber-600 mt-1">
                                ⚠️ Demo Mode - Supabase not configured
                            </p>
                        )}
                    </div>
                    <div className="flex gap-3">
                        <button onClick={handleExport} className="btn-secondary text-sm">
                            📥 Export CSV
                        </button>
                        <button onClick={handleLogout} className="btn-secondary text-sm">
                            Logout
                        </button>
                    </div>
                </div>

                {/* Stats cards */}
                {stats && (
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <div className="card">
                            <p className="text-ocean-600 text-sm font-medium">Total Submissions</p>
                            <p className="text-3xl font-bold text-ocean-800">{stats.totalSubmissions}</p>
                        </div>
                        <div className="card">
                            <p className="text-ocean-600 text-sm font-medium">Avg. Correct</p>
                            <p className="text-3xl font-bold text-ocean-800">
                                {stats.averageCorrectAnswers.toFixed(1)}/4
                            </p>
                        </div>
                        <div className="card col-span-2 lg:col-span-1">
                            <p className="text-ocean-600 text-sm font-medium mb-2">By Language</p>
                            <div className="flex flex-wrap gap-2 text-sm">
                                {Object.entries(stats.submissionsByLanguage).map(([lang, count]) => (
                                    <span key={lang} className="px-2 py-1 bg-ocean-100 rounded text-ocean-700">
                                        {lang.toUpperCase()}: {count}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="card col-span-2 lg:col-span-1">
                            <p className="text-ocean-600 text-sm font-medium mb-2">By Prize Tier</p>
                            <div className="flex flex-wrap gap-2 text-sm">
                                {Object.entries(stats.submissionsByPrizeTier).map(([tier, count]) => (
                                    <span key={tier} className="px-2 py-1 bg-ocean-100 rounded text-ocean-700">
                                        Tier {tier}: {count}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Filters */}
                <div className="card mb-6">
                    <h2 className="text-lg font-semibold text-ocean-800 mb-4">Filters</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-ocean-700 mb-1">
                                Language
                            </label>
                            <select
                                value={languageFilter}
                                onChange={(e) => setLanguageFilter(e.target.value)}
                                className="input-field"
                            >
                                <option value="all">All Languages</option>
                                <option value="pt">Portuguese</option>
                                <option value="es">Spanish</option>
                                <option value="fr">French</option>
                                <option value="de">German</option>
                                <option value="en">English</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-ocean-700 mb-1">
                                Quiz
                            </label>
                            <select
                                value={quizFilter}
                                onChange={(e) => setQuizFilter(e.target.value)}
                                className="input-field"
                            >
                                <option value="all">All Quizzes</option>
                                <option value="1">Quiz 1</option>
                                <option value="2">Quiz 2</option>
                                <option value="3">Quiz 3</option>
                                <option value="4">Quiz 4</option>
                                <option value="5">Quiz 5</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-ocean-700 mb-1">
                                Prize Tier
                            </label>
                            <select
                                value={prizeFilter}
                                onChange={(e) => setPrizeFilter(e.target.value)}
                                className="input-field"
                            >
                                <option value="all">All Tiers</option>
                                <option value="0">Tier 0 (No Prize)</option>
                                <option value="1">Tier 1 (1 Correct)</option>
                                <option value="2">Tier 2 (2 Correct)</option>
                                <option value="3">Tier 3 (3 Correct)</option>
                                <option value="4">Tier 4 (4 Correct)</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Submissions table */}
                <div className="card overflow-hidden">
                    <h2 className="text-lg font-semibold text-ocean-800 mb-4">
                        Submissions ({submissions.length})
                    </h2>

                    {isLoading ? (
                        <div className="text-center py-8 text-ocean-600">Loading...</div>
                    ) : submissions.length === 0 ? (
                        <div className="text-center py-8 text-ocean-600">No submissions found</div>
                    ) : (
                        <div className="overflow-x-auto -mx-6 sm:-mx-8">
                            <table className="w-full text-sm">
                                <thead className="bg-ocean-100 text-ocean-700">
                                    <tr>
                                        <th className="px-4 py-3 text-left font-medium">Name</th>
                                        <th className="px-4 py-3 text-left font-medium">Email</th>
                                        <th className="px-4 py-3 text-left font-medium">Lang</th>
                                        <th className="px-4 py-3 text-left font-medium">Quiz</th>
                                        <th className="px-4 py-3 text-left font-medium">Score</th>
                                        <th className="px-4 py-3 text-left font-medium">Prize</th>
                                        <th className="px-4 py-3 text-left font-medium">Time</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-ocean-100">
                                    {submissions.map((s) => (
                                        <tr key={s.id} className="hover:bg-ocean-50">
                                            <td className="px-4 py-3 font-medium text-ocean-800">{s.name}</td>
                                            <td className="px-4 py-3 text-ocean-600">{s.email}</td>
                                            <td className="px-4 py-3">
                                                <span className="uppercase text-xs font-medium bg-ocean-100 text-ocean-700 px-2 py-1 rounded">
                                                    {s.language}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-ocean-600">#{s.quiz_id}</td>
                                            <td className="px-4 py-3">
                                                <span className={`font-medium ${s.correct_answers >= 3 ? 'text-green-600' :
                                                        s.correct_answers >= 1 ? 'text-ocean-600' : 'text-gray-500'
                                                    }`}>
                                                    {s.correct_answers}/4
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-ocean-600">
                                                {s.prize_awarded || '—'}
                                            </td>
                                            <td className="px-4 py-3 text-ocean-500 text-xs">
                                                {new Date(s.timestamp).toLocaleString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
