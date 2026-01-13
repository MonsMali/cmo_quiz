'use client';

import { useState } from 'react';
import { Language } from '@/types';
import { getTranslation } from '@/data/translations';

interface UserFormProps {
    language: Language;
    onSubmit: (data: { name: string; email: string; gdprAccepted: boolean }) => void;
    isLoading: boolean;
}

const GDPR_TEXT = `O Município de Olhão informa que os dados solicitados, serão tratados de acordo com a nossa Politica de Privacidade, disponível no site https://cm-olhao.pt/menu/1676/politica-de-privacidade. Significando isto, que recolhemos os seus dados pessoais, unicamente, para a finalidade aqui determinada: Participação em atividade promocional/ Concurso e, que os mesmos serão destruídos após a conclusão do evento, considerando a atribuição de prémio e prazos de reclamação, legalmente previstos. O fundamento para o tratamento das informações prestadas é o plasmado na alínea b)., do nr. 1 do artigo 6º do Regulamento Geral de Proteção de Dados (RGPD). No entanto, se nos autorizar, assinalando essa vontade, enviaremos por email informações sobre outros eventos a decorrer no Concelho de Olhão e nos quais gostaríamos de contar com a sua presença. Caso pretenda pode a qualquer momento, aceder, alterar corrigir ou apagar os seus dados pessoais, através do email epd@cm-olhao.pt .`;

// GDPR error messages by language
const gdprErrorMessages: Record<Language, string> = {
    pt: 'Deve aceitar a política de privacidade para continuar',
    es: 'Debe aceptar la política de privacidad para continuar',
    fr: 'Vous devez accepter la politique de confidentialité pour continuer',
    de: 'Sie müssen die Datenschutzrichtlinie akzeptieren, um fortzufahren',
    en: 'You must accept the privacy policy to continue',
};

export default function UserForm({ language, onSubmit, isLoading }: UserFormProps) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [gdprAccepted, setGdprAccepted] = useState(false);
    const [errors, setErrors] = useState<{ name?: string; email?: string; gdpr?: string }>({});

    const validateEmail = (email: string): boolean => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors: { name?: string; email?: string; gdpr?: string } = {};

        if (!name.trim()) {
            newErrors.name = getTranslation('nameRequired', language);
        }

        if (!email.trim()) {
            newErrors.email = getTranslation('emailRequired', language);
        } else if (!validateEmail(email)) {
            newErrors.email = getTranslation('emailInvalid', language);
        }

        if (!gdprAccepted) {
            newErrors.gdpr = gdprErrorMessages[language];
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        onSubmit({ name: name.trim(), email: email.trim(), gdprAccepted });
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

                {/* GDPR consent checkbox - Required */}
                <div className={`p-4 rounded-lg border ${errors.gdpr ? 'border-coral-400 bg-coral-50' : 'border-ocean-200 bg-ocean-50'}`}>
                    <div className="flex items-start gap-3">
                        <input
                            type="checkbox"
                            id="gdprAccepted"
                            checked={gdprAccepted}
                            onChange={(e) => {
                                setGdprAccepted(e.target.checked);
                                if (errors.gdpr) setErrors((prev) => ({ ...prev, gdpr: undefined }));
                            }}
                            className="mt-1 w-5 h-5 text-ocean-500 border-ocean-300 rounded focus:ring-ocean-400 flex-shrink-0"
                            disabled={isLoading}
                        />
                        <label
                            htmlFor="gdprAccepted"
                            className="text-xs text-ocean-700 leading-relaxed cursor-pointer"
                        >
                            {GDPR_TEXT} *
                        </label>
                    </div>
                    {errors.gdpr && (
                        <p className="mt-2 text-sm text-coral-500 font-medium">{errors.gdpr}</p>
                    )}
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
