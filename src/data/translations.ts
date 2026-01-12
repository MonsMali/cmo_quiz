import { Language } from '@/types';

type TranslationKey =
    | 'welcome'
    | 'selectLanguage'
    | 'startQuiz'
    | 'question'
    | 'of'
    | 'next'
    | 'submit'
    | 'yourDetails'
    | 'fullName'
    | 'email'
    | 'marketingConsent'
    | 'submitForm'
    | 'loading'
    | 'results'
    | 'youAnswered'
    | 'correctAnswers'
    | 'outOf'
    | 'congratulations'
    | 'yourPrize'
    | 'noPrize'
    | 'thankYou'
    | 'visitOlhao'
    | 'alreadyParticipated'
    | 'errorOccurred'
    | 'tryAgain'
    | 'admin'
    | 'login'
    | 'password'
    | 'export'
    | 'filters'
    | 'dateRange'
    | 'all'
    | 'statistics'
    | 'totalSubmissions'
    | 'byLanguage'
    | 'byPrize'
    | 'nameRequired'
    | 'emailRequired'
    | 'emailInvalid';

export const translations: Record<TranslationKey, Record<Language, string>> = {
    welcome: {
        pt: 'Bem-vindo ao Quiz de Olhão!',
        es: '¡Bienvenido al Quiz de Olhão!',
        fr: 'Bienvenue au Quiz d\'Olhão !',
        de: 'Willkommen zum Olhão-Quiz!',
        en: 'Welcome to the Olhão Quiz!',
    },
    selectLanguage: {
        pt: 'Selecione o seu idioma',
        es: 'Seleccione su idioma',
        fr: 'Sélectionnez votre langue',
        de: 'Wählen Sie Ihre Sprache',
        en: 'Select your language',
    },
    startQuiz: {
        pt: 'Iniciar Quiz',
        es: 'Iniciar Quiz',
        fr: 'Commencer le Quiz',
        de: 'Quiz starten',
        en: 'Start Quiz',
    },
    question: {
        pt: 'Pergunta',
        es: 'Pregunta',
        fr: 'Question',
        de: 'Frage',
        en: 'Question',
    },
    of: {
        pt: 'de',
        es: 'de',
        fr: 'sur',
        de: 'von',
        en: 'of',
    },
    next: {
        pt: 'Próxima',
        es: 'Siguiente',
        fr: 'Suivant',
        de: 'Weiter',
        en: 'Next',
    },
    submit: {
        pt: 'Submeter',
        es: 'Enviar',
        fr: 'Soumettre',
        de: 'Absenden',
        en: 'Submit',
    },
    yourDetails: {
        pt: 'Os seus dados',
        es: 'Sus datos',
        fr: 'Vos coordonnées',
        de: 'Ihre Daten',
        en: 'Your details',
    },
    fullName: {
        pt: 'Nome completo',
        es: 'Nombre completo',
        fr: 'Nom complet',
        de: 'Vollständiger Name',
        en: 'Full name',
    },
    email: {
        pt: 'Email',
        es: 'Correo electrónico',
        fr: 'E-mail',
        de: 'E-Mail',
        en: 'Email',
    },
    marketingConsent: {
        pt: 'Aceito receber informações turísticas da Câmara Municipal de Olhão',
        es: 'Acepto recibir información turística del Ayuntamiento de Olhão',
        fr: 'J\'accepte de recevoir des informations touristiques de la Mairie d\'Olhão',
        de: 'Ich möchte touristische Informationen von der Stadtverwaltung Olhão erhalten',
        en: 'I consent to receive tourism information from Olhão City Council',
    },
    submitForm: {
        pt: 'Enviar e ver resultado',
        es: 'Enviar y ver resultado',
        fr: 'Envoyer et voir le résultat',
        de: 'Absenden und Ergebnis sehen',
        en: 'Submit and see result',
    },
    loading: {
        pt: 'A carregar...',
        es: 'Cargando...',
        fr: 'Chargement...',
        de: 'Laden...',
        en: 'Loading...',
    },
    results: {
        pt: 'Resultados',
        es: 'Resultados',
        fr: 'Résultats',
        de: 'Ergebnisse',
        en: 'Results',
    },
    youAnswered: {
        pt: 'Respondeu a',
        es: 'Respondió a',
        fr: 'Vous avez répondu à',
        de: 'Sie haben beantwortet',
        en: 'You answered',
    },
    correctAnswers: {
        pt: 'respostas corretas',
        es: 'respuestas correctas',
        fr: 'réponses correctes',
        de: 'richtige Antworten',
        en: 'correct answers',
    },
    outOf: {
        pt: 'de',
        es: 'de',
        fr: 'sur',
        de: 'von',
        en: 'out of',
    },
    congratulations: {
        pt: 'Parabéns!',
        es: '¡Felicidades!',
        fr: 'Félicitations !',
        de: 'Herzlichen Glückwunsch!',
        en: 'Congratulations!',
    },
    yourPrize: {
        pt: 'O seu prémio:',
        es: 'Su premio:',
        fr: 'Votre prix :',
        de: 'Ihr Preis:',
        en: 'Your prize:',
    },
    noPrize: {
        pt: 'Infelizmente não ganhou um prémio desta vez.',
        es: 'Lamentablemente no ganó un premio esta vez.',
        fr: 'Malheureusement, vous n\'avez pas gagné de prix cette fois.',
        de: 'Leider haben Sie diesmal keinen Preis gewonnen.',
        en: 'Unfortunately, you didn\'t win a prize this time.',
    },
    thankYou: {
        pt: 'Obrigado por participar!',
        es: '¡Gracias por participar!',
        fr: 'Merci d\'avoir participé !',
        de: 'Vielen Dank für Ihre Teilnahme!',
        en: 'Thank you for participating!',
    },
    visitOlhao: {
        pt: 'Esperamos a sua visita a Olhão!',
        es: '¡Esperamos su visita a Olhão!',
        fr: 'Nous espérons votre visite à Olhão !',
        de: 'Wir freuen uns auf Ihren Besuch in Olhão!',
        en: 'We hope to see you in Olhão!',
    },
    alreadyParticipated: {
        pt: 'Este email já participou no quiz.',
        es: 'Este correo electrónico ya participó en el quiz.',
        fr: 'Ce e-mail a déjà participé au quiz.',
        de: 'Diese E-Mail hat bereits am Quiz teilgenommen.',
        en: 'This email has already participated in the quiz.',
    },
    errorOccurred: {
        pt: 'Ocorreu um erro. Por favor, tente novamente.',
        es: 'Ocurrió un error. Por favor, inténtelo de nuevo.',
        fr: 'Une erreur s\'est produite. Veuillez réessayer.',
        de: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.',
        en: 'An error occurred. Please try again.',
    },
    tryAgain: {
        pt: 'Tentar novamente',
        es: 'Intentar de nuevo',
        fr: 'Réessayer',
        de: 'Erneut versuchen',
        en: 'Try again',
    },
    admin: {
        pt: 'Administração',
        es: 'Administración',
        fr: 'Administration',
        de: 'Administration',
        en: 'Administration',
    },
    login: {
        pt: 'Entrar',
        es: 'Iniciar sesión',
        fr: 'Se connecter',
        de: 'Anmelden',
        en: 'Login',
    },
    password: {
        pt: 'Palavra-passe',
        es: 'Contraseña',
        fr: 'Mot de passe',
        de: 'Passwort',
        en: 'Password',
    },
    export: {
        pt: 'Exportar CSV',
        es: 'Exportar CSV',
        fr: 'Exporter CSV',
        de: 'CSV exportieren',
        en: 'Export CSV',
    },
    filters: {
        pt: 'Filtros',
        es: 'Filtros',
        fr: 'Filtres',
        de: 'Filter',
        en: 'Filters',
    },
    dateRange: {
        pt: 'Intervalo de datas',
        es: 'Rango de fechas',
        fr: 'Plage de dates',
        de: 'Datumsbereich',
        en: 'Date range',
    },
    all: {
        pt: 'Todos',
        es: 'Todos',
        fr: 'Tous',
        de: 'Alle',
        en: 'All',
    },
    statistics: {
        pt: 'Estatísticas',
        es: 'Estadísticas',
        fr: 'Statistiques',
        de: 'Statistiken',
        en: 'Statistics',
    },
    totalSubmissions: {
        pt: 'Total de participações',
        es: 'Total de participaciones',
        fr: 'Total des participations',
        de: 'Gesamtteilnahmen',
        en: 'Total submissions',
    },
    byLanguage: {
        pt: 'Por idioma',
        es: 'Por idioma',
        fr: 'Par langue',
        de: 'Nach Sprache',
        en: 'By language',
    },
    byPrize: {
        pt: 'Por prémio',
        es: 'Por premio',
        fr: 'Par prix',
        de: 'Nach Preis',
        en: 'By prize',
    },
    nameRequired: {
        pt: 'O nome é obrigatório',
        es: 'El nombre es obligatorio',
        fr: 'Le nom est requis',
        de: 'Name ist erforderlich',
        en: 'Name is required',
    },
    emailRequired: {
        pt: 'O email é obrigatório',
        es: 'El correo electrónico es obligatorio',
        fr: 'L\'e-mail est requis',
        de: 'E-Mail ist erforderlich',
        en: 'Email is required',
    },
    emailInvalid: {
        pt: 'Email inválido',
        es: 'Correo electrónico inválido',
        fr: 'E-mail invalide',
        de: 'Ungültige E-Mail',
        en: 'Invalid email',
    },
};

export const getTranslation = (key: TranslationKey, language: Language): string => {
    return translations[key][language] || translations[key]['en'];
};

// Language names for display
export const languageNames: Record<Language, string> = {
    pt: 'Português',
    es: 'Español',
    fr: 'Français',
    de: 'Deutsch',
    en: 'English',
};

// Nationality inference mapping
export const nationalityFromLanguage: Record<Language, string> = {
    pt: 'Portuguese (inferred)',
    es: 'Spanish (inferred)',
    fr: 'French (inferred)',
    de: 'German (inferred)',
    en: 'Other / English-speaking (inferred)',
};
