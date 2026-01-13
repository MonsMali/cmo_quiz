'use client';

import { useState } from 'react';
import { Language } from '@/types';
import { getTranslation } from '@/data/translations';

interface UserFormProps {
    language: Language;
    onSubmit: (data: { name: string; email: string; marketingConsent: boolean }) => void;
    isLoading: boolean;
}

export default function UserForm({ language, onSubmit, isLoading }: UserFormProps) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [marketingConsent, setMarketingConsent] = useState(false);
    const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

    const validateEmail = (email: string): boolean => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors: { name?: string; email?: string } = {};

        if (!name.trim()) {
            newErrors.name = getTranslation('nameRequired', language);
        }

        if (!email.trim()) {
            newErrors.email = getTranslation('emailRequired', language);
        } else if (!validateEmail(email)) {
            newErrors.email = getTranslation('emailInvalid', language);
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        onSubmit({ name: name.trim(), email: email.trim(), marketingConsent });
    };

    return (
        <div className="slide-up">
            <h2 className="text-2xl font-bold text-ocean-800 mb-6">
                {getTranslation('yourDetails', language)}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name field */}
                <div>
                    <label
                        htmlFor="name"
                        className="block text-sm font-medium text-ocean-700 mb-2"
                    >
                        {getTranslation('fullName', language)} *
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                            if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                        }}
                        className={`input-field ${errors.name ? 'error' : ''}`}
                        placeholder={getTranslation('fullName', language)}
                        disabled={isLoading}
                        autoComplete="name"
                    />
                    {errors.name && (
                        <p className="mt-1 text-sm text-coral-500">{errors.name}</p>
                    )}
                </div>

                {/* Email field */}
                <div>
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-ocean-700 mb-2"
                    >
                        {getTranslation('email', language)} *
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                        }}
                        className={`input-field ${errors.email ? 'error' : ''}`}
                        placeholder="email@example.com"
                        disabled={isLoading}
                        autoComplete="email"
                    />
                    {errors.email && (
                        <p className="mt-1 text-sm text-coral-500">{errors.email}</p>
                    )}
                </div>

                {/* Marketing consent checkbox */}
                <div className="flex items-start gap-3 py-2">
                    <input
                        type="checkbox"
                        id="marketingConsent"
                        checked={marketingConsent}
                        onChange={(e) => setMarketingConsent(e.target.checked)}
                        className="mt-1 w-5 h-5 text-ocean-500 border-ocean-300 rounded focus:ring-ocean-400"
                        disabled={isLoading}
                    />
                    <label
                        htmlFor="marketingConsent"
                        className="text-sm text-ocean-600 leading-relaxed cursor-pointer"
                    >
                        {getTranslation('marketingConsent', language)}
                    </label>
                </div>

                {/* Submit button */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className="btn-primary w-full flex items-center justify-center gap-2"
                >
                    {isLoading ? (
                        <>
                            <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white spinner" />
                            <span>{getTranslation('loading', language)}</span>
                        </>
                    ) : (
                        getTranslation('submitForm', language)
                    )}
                </button>
            </form>
        </div>
    );
}
