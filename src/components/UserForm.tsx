'use client';

import { useState } from 'react';
import { Language } from '@/types';
import { getTranslation } from '@/data/translations';
import { isValidEmail } from '@/lib/emailValidation';

interface UserFormProps {
    language: Language;
    onSubmit: (data: { name: string; email: string; gdprAccepted: boolean }) => void;
    isLoading: boolean;
}

const GDPR_TEXT: Record<Language, string> = {
    pt: `O Município de Olhão informa que os dados solicitados, serão tratados de acordo com a nossa Politica de Privacidade, disponível no site https://cm-olhao.pt/menu/1676/politica-de-privacidade. Significando isto, que recolhemos os seus dados pessoais, unicamente, para a finalidade aqui determinada: Participação em atividade promocional/ Concurso e, que os mesmos serão destruídos após a conclusão do evento, considerando a atribuição de prémio e prazos de reclamação, legalmente previstos. O fundamento para o tratamento das informações prestadas é o plasmado na alínea b)., do nr. 1 do artigo 6º do Regulamento Geral de Proteção de Dados (RGPD). No entanto, se nos autorizar, assinalando essa vontade, enviaremos por email informações sobre outros eventos a decorrer no Concelho de Olhão e nos quais gostaríamos de contar com a sua presença. Caso pretenda pode a qualquer momento, aceder, alterar corrigir ou apagar os seus dados pessoais, através do email epd@cm-olhao.pt .`,
    es: `El Municipio de Olhão informa que los datos solicitados serán tratados de acuerdo con nuestra Política de Privacidad, disponible en https://cm-olhao.pt/menu/1676/politica-de-privacidade. Esto significa que recogemos sus datos personales únicamente para la finalidad aquí determinada: Participación en actividad promocional/Concurso, y que los mismos serán destruidos tras la conclusión del evento, considerando la atribución de premios y plazos de reclamación legalmente previstos. El fundamento para el tratamiento de la información proporcionada es el establecido en la letra b) del nº 1 del artículo 6 del Reglamento General de Protección de Datos (RGPD). Sin embargo, si nos autoriza, señalando esa voluntad, le enviaremos por correo electrónico información sobre otros eventos en el Municipio de Olhão. En cualquier momento puede acceder, modificar, corregir o eliminar sus datos personales a través del correo epd@cm-olhao.pt .`,
    fr: `La Municipalité d'Olhão informe que les données demandées seront traitées conformément à notre Politique de Confidentialité, disponible sur https://cm-olhao.pt/menu/1676/politica-de-privacidade. Cela signifie que nous collectons vos données personnelles uniquement pour la finalité déterminée ici : Participation à une activité promotionnelle/Concours, et que celles-ci seront détruites après la conclusion de l'événement, en tenant compte de l'attribution des prix et des délais de réclamation légalement prévus. Le fondement du traitement des informations fournies est celui prévu à l'alinéa b) du nº 1 de l'article 6 du Règlement Général sur la Protection des Données (RGPD). Cependant, si vous nous y autorisez, nous vous enverrons par e-mail des informations sur d'autres événements dans la Municipalité d'Olhão. Vous pouvez à tout moment accéder, modifier, corriger ou supprimer vos données personnelles via l'e-mail epd@cm-olhao.pt .`,
    de: `Die Gemeinde Olhão informiert, dass die angeforderten Daten gemäß unserer Datenschutzrichtlinie behandelt werden, verfügbar unter https://cm-olhao.pt/menu/1676/politica-de-privacidade. Dies bedeutet, dass wir Ihre personenbezogenen Daten ausschließlich für den hier bestimmten Zweck erheben: Teilnahme an einer Werbeaktion/Gewinnspiel, und dass diese nach Abschluss der Veranstaltung unter Berücksichtigung der Preisverleihung und gesetzlich vorgesehenen Reklamationsfristen vernichtet werden. Die Grundlage für die Verarbeitung der bereitgestellten Informationen ist Artikel 6 Abs. 1 lit. b) der Datenschutz-Grundverordnung (DSGVO). Wenn Sie uns jedoch autorisieren, senden wir Ihnen per E-Mail Informationen über andere Veranstaltungen in der Gemeinde Olhão. Sie können jederzeit auf Ihre personenbezogenen Daten zugreifen, diese ändern, berichtigen oder löschen, indem Sie sich an epd@cm-olhao.pt wenden.`,
    en: `The Municipality of Olhão informs that the requested data will be processed in accordance with our Privacy Policy, available at https://cm-olhao.pt/menu/1676/politica-de-privacidade. This means that we collect your personal data solely for the purpose determined here: Participation in a promotional activity/Contest, and that they will be destroyed after the conclusion of the event, considering the award of prizes and legally established claim deadlines. The basis for processing the information provided is Article 6(1)(b) of the General Data Protection Regulation (GDPR). However, if you authorize us, we will send you by email information about other events in the Municipality of Olhão. You may at any time access, modify, correct or delete your personal data by contacting epd@cm-olhao.pt .`,
};

// GDPR error messages by language
const gdprErrorMessages: Record<Language, string> = {
    pt: 'Deve aceitar a política de privacidade para continuar',
    es: 'Debe aceptar la política de privacidad para continuar',
    fr: 'Vous devez accepter la politique de confidentialité pour continuer',
    de: 'Sie müssen die Datenschutzrichtlinie akzeptieren, um fortzufahren',
    en: 'You must accept the privacy policy to continue',
};

// GDPR accept checkbox labels by language
const gdprAcceptLabels: Record<Language, string> = {
    pt: 'Li e aceito a política de privacidade',
    es: 'He leído y acepto la política de privacidad',
    fr: 'J\'ai lu et j\'accepte la politique de confidentialité',
    de: 'Ich habe die Datenschutzrichtlinie gelesen und akzeptiere sie',
    en: 'I have read and accept the privacy policy',
};

// Form subtitle (encouraging message)
const formSubtitles: Record<Language, string> = {
    pt: 'Quase lá! Preencha os seus dados para reclamar o seu prémio.',
    es: '¡Casi! Rellene sus datos para reclamar su premio.',
    fr: 'Presque fini ! Remplissez vos coordonnées pour réclamer votre prix.',
    de: 'Fast geschafft! Füllen Sie Ihre Daten aus, um Ihren Preis zu beanspruchen.',
    en: 'Almost there! Fill in your details to claim your prize.',
};

export default function UserForm({ language, onSubmit, isLoading }: UserFormProps) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [gdprAccepted, setGdprAccepted] = useState(false);
    const [errors, setErrors] = useState<{ name?: string; email?: string; gdpr?: string }>({});

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors: { name?: string; email?: string; gdpr?: string } = {};

        if (!name.trim()) {
            newErrors.name = getTranslation('nameRequired', language);
        }

        if (!email.trim()) {
            newErrors.email = getTranslation('emailRequired', language);
        } else if (!isValidEmail(email)) {
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
            <h2 className="text-2xl font-bold text-ocean-800 mb-2">
                {getTranslation('yourDetails', language)}
            </h2>
            <p className="text-ocean-500 text-sm mb-6">
                {formSubtitles[language]}
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name field with icon */}
                <div>
                    <label
                        htmlFor="name"
                        className="block text-sm font-medium text-ocean-700 mb-2"
                    >
                        {getTranslation('fullName', language)} *
                    </label>
                    <div className="relative">
                        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                            <svg className="w-5 h-5 text-ocean-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                                if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                            }}
                            className={`input-field with-icon ${errors.name ? 'error' : ''}`}
                            placeholder={getTranslation('fullName', language)}
                            disabled={isLoading}
                            autoComplete="name"
                        />
                    </div>
                    {errors.name && (
                        <p className="mt-1 text-sm text-coral-500">{errors.name}</p>
                    )}
                </div>

                {/* Email field with icon */}
                <div>
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-ocean-700 mb-2"
                    >
                        {getTranslation('email', language)} *
                    </label>
                    <div className="relative">
                        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                            <svg className="w-5 h-5 text-ocean-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                            </svg>
                        </div>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                            }}
                            className={`input-field with-icon ${errors.email ? 'error' : ''}`}
                            placeholder="email@example.com"
                            disabled={isLoading}
                            autoComplete="email"
                        />
                    </div>
                    {errors.email && (
                        <p className="mt-1 text-sm text-coral-500">{errors.email}</p>
                    )}
                </div>

                {/* GDPR consent - scrollable box */}
                <div className={`rounded-lg border ${errors.gdpr ? 'border-coral-400 bg-red-50' : 'border-ocean-200 bg-ocean-50'}`}>
                    {/* Scrollable legal text */}
                    <div className="p-4 pb-0 relative">
                        <div className="max-h-28 overflow-y-auto text-xs text-ocean-700 leading-relaxed pr-2">
                            {GDPR_TEXT[language]}
                        </div>
                        {/* Fade indicator for scroll */}
                        <div className="h-4 bg-gradient-to-t from-ocean-50 to-transparent pointer-events-none -mt-4 relative z-10" />
                    </div>

                    {/* Checkbox with larger tap target */}
                    <div className="px-4 pb-4">
                        <div className="flex items-center gap-3 min-h-[44px] py-1">
                            <input
                                type="checkbox"
                                id="gdprAccepted"
                                checked={gdprAccepted}
                                onChange={(e) => {
                                    setGdprAccepted(e.target.checked);
                                    if (errors.gdpr) setErrors((prev) => ({ ...prev, gdpr: undefined }));
                                }}
                                className="w-5 h-5 text-ocean-500 border-ocean-300 rounded focus:ring-ocean-400 flex-shrink-0 cursor-pointer"
                                disabled={isLoading}
                            />
                            <label
                                htmlFor="gdprAccepted"
                                className="text-sm text-ocean-800 font-medium cursor-pointer select-none"
                            >
                                {gdprAcceptLabels[language]} *
                            </label>
                        </div>
                        {errors.gdpr && (
                            <p className="mt-1 text-sm text-coral-500 font-medium">{errors.gdpr}</p>
                        )}
                    </div>
                </div>

                {/* Submit button */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className="btn-primary w-full flex items-center justify-center gap-2"
                >
                    {isLoading ? (
                        <span className="dot-loading flex items-center gap-1">
                            <span className="w-2 h-2 bg-white rounded-full inline-block" />
                            <span className="w-2 h-2 bg-white rounded-full inline-block" />
                            <span className="w-2 h-2 bg-white rounded-full inline-block" />
                        </span>
                    ) : (
                        getTranslation('submitForm', language)
                    )}
                </button>
            </form>
        </div>
    );
}
