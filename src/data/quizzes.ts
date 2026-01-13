import { Quiz } from '@/types';

export const quizzes: Quiz[] = [
    // Quiz 1: Ria Formosa & Olhão Basics
    {
        id: 1,
        questions: [
            {
                id: 'q1_1',
                text: {
                    pt: 'Que cidade é carinhosamente conhecida como a "Capital da Ria Formosa"?',
                    es: '¿Qué ciudad es conocida como la "Capital de la Ría Formosa"?',
                    fr: 'Quelle ville est connue comme la "Capitale de la Ria Formosa" ?',
                    de: 'Welche Stadt ist als "Hauptstadt der Ria Formosa" bekannt?',
                    en: 'Which city is affectionately known as the "Capital of Ria Formosa"?',
                },
                options: {
                    pt: ['Olhão', 'Tavira', 'Faro', 'Albufeira'],
                    es: ['Olhão', 'Tavira', 'Faro', 'Albufeira'],
                    fr: ['Olhão', 'Tavira', 'Faro', 'Albufeira'],
                    de: ['Olhão', 'Tavira', 'Faro', 'Albufeira'],
                    en: ['Olhão', 'Tavira', 'Faro', 'Albufeira'],
                },
                correctIndex: 0,
            },
            {
                id: 'q1_2',
                text: {
                    pt: 'Qual é o parque natural que envolve a cidade de Olhão?',
                    es: '¿Cuál es el parque natural que rodea la ciudad de Olhão?',
                    fr: 'Quel est le parc naturel qui entoure la ville d\'Olhão ?',
                    de: 'Welcher Naturpark umgibt die Stadt Olhão?',
                    en: 'Which natural park surrounds the city of Olhão?',
                },
                options: {
                    pt: ['Costa Vicentina', 'Ria Formosa', 'Sudoeste Alentejano', 'Sapal de Castro Marim'],
                    es: ['Costa Vicentina', 'Ría Formosa', 'Suroeste Alentejano', 'Sapal de Castro Marim'],
                    fr: ['Costa Vicentina', 'Ria Formosa', 'Sud-Ouest Alentejano', 'Sapal de Castro Marim'],
                    de: ['Costa Vicentina', 'Ria Formosa', 'Südwest-Alentejo', 'Sapal de Castro Marim'],
                    en: ['Costa Vicentina', 'Ria Formosa', 'Southwest Alentejo', 'Sapal de Castro Marim'],
                },
                correctIndex: 1,
            },
            {
                id: 'q1_3',
                text: {
                    pt: 'Qual destas ilhas barreira pertence ao concelho de Olhão?',
                    es: '¿Cuál de estas islas barrera pertenece al municipio de Olhão?',
                    fr: 'Laquelle de ces îles barrières appartient à la municipalité d\'Olhão ?',
                    de: 'Welche dieser Barriereinseln gehört zur Gemeinde Olhão?',
                    en: 'Which of these barrier islands belongs to the municipality of Olhão?',
                },
                options: {
                    pt: ['Ilha de Tavira', 'Ilha da Culatra', 'Ilha de Cabanas', 'Ilha da Armona'],
                    es: ['Isla de Tavira', 'Isla de Culatra', 'Isla de Cabanas', 'Isla de Armona'],
                    fr: ['Île de Tavira', 'Île de Culatra', 'Île de Cabanas', 'Île d\'Armona'],
                    de: ['Insel Tavira', 'Insel Culatra', 'Insel Cabanas', 'Insel Armona'],
                    en: ['Tavira Island', 'Culatra Island', 'Cabanas Island', 'Armona Island'],
                },
                correctIndex: 3,
            },
            {
                id: 'q1_4',
                text: {
                    pt: 'Qual é o edifício mais icónico da zona ribeirinha de Olhão?',
                    es: '¿Cuál es el edificio más icónico del paseo marítimo de Olhão?',
                    fr: 'Quel est l\'édifice le plus emblématique du front de mer d\'Olhão ?',
                    de: 'Was ist das ikonischste Gebäude an der Uferpromenade von Olhão?',
                    en: 'What is the most iconic building on the Olhão waterfront?',
                },
                options: {
                    pt: ['Forte do Rato', 'Mercado Municipal (Mercados de Olhão)', 'Igreja Matriz', 'Recreio Artístico'],
                    es: ['Fuerte do Rato', 'Mercado Municipal', 'Iglesia Matriz', 'Recreio Artístico'],
                    fr: ['Fort do Rato', 'Marché Municipal', 'Église Matriz', 'Recreio Artístico'],
                    de: ['Fort do Rato', 'Markthalle (Mercados de Olhão)', 'Hauptkirche Matriz', 'Recreio Artístico'],
                    en: ['Fort do Rato', 'Municipal Market', 'Matriz Church', 'Recreio Artístico'],
                },
                correctIndex: 1,
            },
        ],
    },

    // Quiz 2: History & Identity
    {
        id: 2,
        questions: [
            {
                id: 'q2_1',
                text: {
                    pt: 'Historicamente, Olhão desenvolveu-se graças a que atividade?',
                    es: 'Históricamente, ¿Olhão se desarrolló gracias a qué actividad?',
                    fr: 'Historiquement, Olhão s\'est développée grâce à quelle activité ?',
                    de: 'Wodurch hat sich Olhão historisch gesehen entwickelt?',
                    en: 'Historically, Olhão developed thanks to which activity?',
                },
                options: {
                    pt: ['Produção de cortiça', 'Pesca e indústria conserveira', 'Turismo de golfe', 'Extração de sal'],
                    es: ['Producción de corcho', 'Pesca e industria conservera', 'Turismo de golf', 'Extracción de sal'],
                    fr: ['Production de liège', 'Pêche et industrie conservière', 'Tourisme de golf', 'Extraction de sel'],
                    de: ['Korkproduktion', 'Fischerei und Konservenindustrie', 'Golftourismus', 'Salzgewinnung'],
                    en: ['Cork production', 'Fishing and canning industry', 'Golf tourism', 'Salt extraction'],
                },
                correctIndex: 1,
            },
            {
                id: 'q2_2',
                text: {
                    pt: 'Em que ano foi Olhão elevada a Vila, após a revolta contra os franceses?',
                    es: '¿En qué año fue Olhão elevada a Villa, tras la revuelta contra los franceses?',
                    fr: 'En quelle année Olhão a-t-elle été élevée au rang de ville après la révolte contre les Français ?',
                    de: 'In welchem Jahr wurde Olhão nach dem Aufstand gegen die Franzosen zur Kleinstadt erhoben?',
                    en: 'In what year was Olhão elevated to a Town status after the revolt against the French?',
                },
                options: {
                    pt: ['1755', '1808', '1910', '1924'],
                    es: ['1755', '1808', '1910', '1924'],
                    fr: ['1755', '1808', '1910', '1924'],
                    de: ['1755', '1808', '1910', '1924'],
                    en: ['1755', '1808', '1910', '1924'],
                },
                correctIndex: 1,
            },
            {
                id: 'q2_3',
                text: {
                    pt: 'Qual é o nome do bairro histórico famoso pelas suas casas de "açoteia" (terraço)?',
                    es: '¿Cómo se llama el barrio histórico famoso por sus casas de "açoteia" (terraza)?',
                    fr: 'Quel est le nom du quartier historique célèbre pour ses maisons à "açoteia" (terrasse) ?',
                    de: 'Wie heißt das historische Viertel, das für seine "Açoteia"-Häuser (Dachterrassen) bekannt ist?',
                    en: 'What is the name of the historic neighborhood famous for its "açoteia" (terrace) houses?',
                },
                options: {
                    pt: ['Bairro da Barreta', 'Bairro de Belém', 'Quinta do Mar', 'Bairro da Mouraria'],
                    es: ['Barrio de la Barreta', 'Barrio de Belém', 'Quinta do Mar', 'Barrio de la Mouraria'],
                    fr: ['Quartier de Barreta', 'Quartier de Belém', 'Quinta do Mar', 'Quartier de la Mouraria'],
                    de: ['Barreta-Viertel', 'Belém-Viertel', 'Quinta do Mar', 'Mouraria-Viertel'],
                    en: ['Barreta neighborhood', 'Belém neighborhood', 'Quinta do Mar', 'Mouraria neighborhood'],
                },
                correctIndex: 0,
            },
            {
                id: 'q2_4',
                text: {
                    pt: 'Como se chamava o barco que os pescadores de Olhão usaram para navegar até ao Brasil em 1808?',
                    es: '¿Cómo se llamaba el barco que los pescadores de Olhão usaron para navegar hasta Brasil en 1808?',
                    fr: 'Comment s\'appelait le bateau que les pêcheurs d\'Olhão ont utilisé pour naviguer jusqu\'au Brésil en 1808 ?',
                    de: 'Wie hieß das Boot, mit dem die Fischer von Olhão 1808 nach Brasilien segelten?',
                    en: 'What was the name of the boat that Olhão fishermen used to sail to Brazil in 1808?',
                },
                options: {
                    pt: ['Santa Maria', 'Caíque Bom Sucesso', 'Pérola do Mar', 'Navegador'],
                    es: ['Santa María', 'Caíque Bom Sucesso', 'Perla del Mar', 'Navegador'],
                    fr: ['Santa Maria', 'Caïre Bom Sucesso', 'Perle de la Mer', 'Navigateur'],
                    de: ['Santa Maria', 'Caíque Bom Sucesso', 'Meeresperle', 'Seefahrer'],
                    en: ['Santa Maria', 'Caíque Bom Sucesso', 'Sea Pearl', 'Navigator'],
                },
                correctIndex: 1,
            },
        ],
    },

    // Quiz 3: Gastronomy 
    {
        id: 3,
        questions: [
            {
                id: 'q3_1',
                text: {
                    pt: 'Qual é o prato de marisco mais emblemático do Algarve, cozinhado num recipiente de cobre?',
                    es: '¿Cuál es el plato de mariscos más emblemático del Algarve, cocinado en un recipiente de cobre?',
                    fr: 'Quel est le plat de fruits de mer le plus emblématique de l\'Algarve, cuit dans un récipient en cuivre ?',
                    de: 'Was ist das symbolträchtigste Meeresfrüchtegericht der Algarve, das in einem Kupfergefäß zubereitet wird?',
                    en: 'What is the most iconic seafood dish of the Algarve, cooked in a copper vessel?',
                },
                options: {
                    pt: ['Caldeirada de Peixe', 'Cataplana de Marisco', 'Arroz de Marisco', 'Sardinha Assada'],
                    es: ['Caldeirada de Pescado', 'Cataplana de Marisco', 'Arroz de Marisco', 'Sardinas Asadas'],
                    fr: ['Caldeirada de poisson', 'Cataplana de fruits de mer', 'Riz aux fruits de mer', 'Sardines grillées'],
                    de: ['Fisch-Caldeirada', 'Cataplana de Marisco', 'Meeresfrüchtereis', 'Gegrillte Sardinen'],
                    en: ['Fish Stew', 'Seafood Cataplana', 'Seafood Rice', 'Grilled Sardines'],
                },
                correctIndex: 1,
            },
            {
                id: 'q3_2',
                text: {
                    pt: 'Qual destes ingredientes é a base de muitos doces tradicionais do Algarve?',
                    es: '¿Cuál de estos ingredientes es la base de muchos dulces tradicionales del Algarve?',
                    fr: 'Lequel de ces ingrédients est à la base de nombreuses pâtisseries traditionnelles de l\'Algarve ?',
                    de: 'Welche dieser Zutaten ist die Basis für viele traditionelle Süßspeisen der Algarve?',
                    en: 'Which of these ingredients is the base of many traditional Algarve sweets?',
                },
                options: {
                    pt: ['Pinhão', 'Amêndoa', 'Castanha', 'Noz'],
                    es: ['Piñón', 'Almendra', 'Castaña', 'Nuez'],
                    fr: ['Pignon de pin', 'Amande', 'Châtaigne', 'Noix'],
                    de: ['Pinienkerne', 'Mandel', 'Kastanie', 'Walnuss'],
                    en: ['Pine nut', 'Almond', 'Chestnut', 'Walnut'],
                },
                correctIndex: 1,
            },
            {
                id: 'q3_3',
                text: {
                    pt: 'Como se chama a aguardente tradicional feita a partir do fruto de um arbusto silvestre?',
                    es: '¿Cómo se llama el aguardiente tradicional hecho a partir del fruto de un arbusto silvestre?',
                    fr: 'Comment s\'appelle l\'eau-de-vie traditionnelle fabriquée à partir du fruit d\'un arbuste sauvage ?',
                    de: 'Wie heißt der traditionelle Schnaps, der aus der Frucht eines Wildstrauches gewonnen wird?',
                    en: 'What is the name of the traditional brandy made from the fruit of a wild shrub?',
                },
                options: {
                    pt: ['Ginjinha', 'Licor Beirão', 'Aguardente de Medronho', 'Poncha'],
                    es: ['Ginjinha', 'Licor Beirão', 'Aguardiente de Medronho', 'Poncha'],
                    fr: ['Ginjinha', 'Liqueur Beirão', 'Eau-de-vie de Medronho', 'Poncha'],
                    de: ['Ginjinha', 'Beirão-Likör', 'Medronho-Schnaps', 'Poncha'],
                    en: ['Ginjinha', 'Beirão Liqueur', 'Medronho Brandy', 'Poncha'],
                },
                correctIndex: 2,
            },
            {
                id: 'q3_4',
                text: {
                    pt: 'O "Dom Rodrigo" é um doce conventual feito de fios de ovos e amêndoa. Em que cidade nasceu?',
                    es: 'El "Dom Rodrigo" es un dulce conventual hecho de hilos de huevo y almendra. ¿En qué ciudad nació?',
                    fr: 'Le "Dom Rodrigo" est une pâtisserie faite de fils d\'œufs et d\'amandes. Dans quelle ville est-il né ?',
                    de: 'Der "Dom Rodrigo" ist eine Süßspeise aus Eierfäden und Mandeln. In welcher Stadt entstand er?',
                    en: 'The "Dom Rodrigo" is a conventual sweet made of egg threads and almonds. In which city was it born?',
                },
                options: {
                    pt: ['Faro', 'Portimão', 'Lagos', 'Olhão'],
                    es: ['Faro', 'Portimão', 'Lagos', 'Olhão'],
                    fr: ['Faro', 'Portimão', 'Lagos', 'Olhão'],
                    de: ['Faro', 'Portimão', 'Lagos', 'Olhão'],
                    en: ['Faro', 'Portimão', 'Lagos', 'Olhão'],
                },
                correctIndex: 2,
            },
        ],
    },

    // Quiz 4: Nature & Beaches
    {
        id: 4,
        questions: [
            {
                id: 'q4_1',
                text: {
                    pt: 'Quantas ilhas-barreira principais protegem a Ria Formosa?',
                    es: '¿Cuántas islas barrera principales protegen la Ría Formosa?',
                    fr: 'Combien d\'îles-barrières principales protègent la Ria Formosa ?',
                    de: 'Wie viele Hauptbarriere-Inseln schützen die Ria Formosa?',
                    en: 'How many main barrier islands protect Ria Formosa?',
                },
                options: {
                    pt: ['3', '5', '7', '9'],
                    es: ['3', '5', '7', '9'],
                    fr: ['3', '5', '7', '9'],
                    de: ['3', '5', '7', '9'],
                    en: ['3', '5', '7', '9'],
                },
                correctIndex: 1,
            },
            {
                id: 'q4_2',
                text: {
                    pt: 'Qual ave é o símbolo do Parque Natural da Ria Formosa?',
                    es: '¿Qué ave es el símbolo del Parque Natural de Ría Formosa?',
                    fr: 'Quel oiseau est le symbole du Parc Naturel de Ria Formosa ?',
                    de: 'Welcher Vogel ist das Symbol des Naturparks Ria Formosa?',
                    en: 'Which bird is the symbol of Ria Formosa Natural Park?',
                },
                options: {
                    pt: ['Cegonha', 'Flamingo', 'Camaleão', 'Galinha-sultana'],
                    es: ['Cigüeña', 'Flamenco', 'Camaleón', 'Calamón común'],
                    fr: ['Cigogne', 'Flamant rose', 'Caméléon', 'Talève sultane'],
                    de: ['Storch', 'Flamingo', 'Chamäleon', 'Purpurhuhn'],
                    en: ['Stork', 'Flamingo', 'Chameleon', 'Purple swamphen'],
                },
                correctIndex: 3,
            },
            {
                id: 'q4_3',
                text: {
                    pt: 'A Ria Formosa é classificada como que tipo de zona húmida?',
                    es: '¿La Ría Formosa está clasificada como qué tipo de humedal?',
                    fr: 'La Ria Formosa est classée comme quel type de zone humide ?',
                    de: 'Als welche Art von Feuchtgebiet ist die Ria Formosa klassifiziert?',
                    en: 'Ria Formosa is classified as what type of wetland?',
                },
                options: {
                    pt: ['Reserva da Biosfera', 'Zona Ramsar', 'Parque Nacional', 'Património Mundial UNESCO'],
                    es: ['Reserva de la Biosfera', 'Zona Ramsar', 'Parque Nacional', 'Patrimonio Mundial UNESCO'],
                    fr: ['Réserve de Biosphère', 'Zone Ramsar', 'Parc National', 'Patrimoine Mondial UNESCO'],
                    de: ['Biosphärenreservat', 'Ramsar-Gebiet', 'Nationalpark', 'UNESCO-Welterbe'],
                    en: ['Biosphere Reserve', 'Ramsar Site', 'National Park', 'UNESCO World Heritage'],
                },
                correctIndex: 1,
            },
            {
                id: 'q4_4',
                text: {
                    pt: 'Qual é a melhor forma de chegar às ilhas de Olhão?',
                    es: '¿Cuál es la mejor forma de llegar a las islas de Olhão?',
                    fr: 'Quelle est la meilleure façon de se rendre aux îles d\'Olhão ?',
                    de: 'Was ist der beste Weg, um die Inseln von Olhão zu erreichen?',
                    en: 'What is the best way to reach the islands of Olhão?',
                },
                options: {
                    pt: ['Ponte rodoviária', 'Ferry/barco', 'Helicóptero', 'Teleférico'],
                    es: ['Puente de carretera', 'Ferry/barco', 'Helicóptero', 'Teleférico'],
                    fr: ['Pont routier', 'Ferry/bateau', 'Hélicoptère', 'Téléphérique'],
                    de: ['Straßenbrücke', 'Fähre/Boot', 'Hubschrauber', 'Seilbahn'],
                    en: ['Road bridge', 'Ferry/boat', 'Helicopter', 'Cable car'],
                },
                correctIndex: 1,
            },
        ],
    },

    // Quiz 5: Culture & Festivals
    {
        id: 5,
        questions: [
            {
                id: 'q5_1',
                text: {
                    pt: 'Qual festival gastronómico anual celebra o marisco em Olhão?',
                    es: '¿Qué festival gastronómico anual celebra el marisco en Olhão?',
                    fr: 'Quel festival gastronomique annuel célèbre les fruits de mer à Olhão ?',
                    de: 'Welches jährliche gastronomische Festival feiert Meeresfrüchte in Olhão?',
                    en: 'Which annual gastronomic festival celebrates seafood in Olhão?',
                },
                options: {
                    pt: ['Festival do Marisco', 'Festa do Peixe', 'Feira do Mar', 'Festival da Sardinha'],
                    es: ['Festival del Marisco', 'Fiesta del Pescado', 'Feria del Mar', 'Festival de la Sardina'],
                    fr: ['Festival des Fruits de Mer', 'Fête du Poisson', 'Foire de la Mer', 'Festival de la Sardine'],
                    de: ['Meeresfrüchte-Festival', 'Fischfest', 'Meeresmesse', 'Sardinen-Festival'],
                    en: ['Seafood Festival', 'Fish Festival', 'Sea Fair', 'Sardine Festival'],
                },
                correctIndex: 0,
            },
            {
                id: 'q5_2',
                text: {
                    pt: 'Em que mês normalmente se realiza o Festival do Marisco de Olhão?',
                    es: '¿En qué mes se celebra normalmente el Festival del Marisco de Olhão?',
                    fr: 'En quel mois se déroule normalement le Festival des Fruits de Mer d\'Olhão ?',
                    de: 'In welchem Monat findet normalerweise das Meeresfrüchte-Festival von Olhão statt?',
                    en: 'In which month is the Olhão Seafood Festival normally held?',
                },
                options: {
                    pt: ['Maio', 'Julho', 'Agosto', 'Outubro'],
                    es: ['Mayo', 'Julio', 'Agosto', 'Octubre'],
                    fr: ['Mai', 'Juillet', 'Août', 'Octobre'],
                    de: ['Mai', 'Juli', 'August', 'Oktober'],
                    en: ['May', 'July', 'August', 'October'],
                },
                correctIndex: 2,
            },
            {
                id: 'q5_3',
                text: {
                    pt: 'Qual estilo arquitetónico influencia as casas tradicionais de Olhão?',
                    es: '¿Qué estilo arquitectónico influye en las casas tradicionales de Olhão?',
                    fr: 'Quel style architectural influence les maisons traditionnelles d\'Olhão ?',
                    de: 'Welcher architektonische Stil beeinflusst die traditionellen Häuser von Olhão?',
                    en: 'Which architectural style influences the traditional houses of Olhão?',
                },
                options: {
                    pt: ['Gótico', 'Mourisco/Norte-Africano', 'Barroco', 'Art Deco'],
                    es: ['Gótico', 'Morisco/Norteafricano', 'Barroco', 'Art Deco'],
                    fr: ['Gothique', 'Mauresque/Nord-Africain', 'Baroque', 'Art Déco'],
                    de: ['Gotisch', 'Maurisch/Nordafrikanisch', 'Barock', 'Art Deco'],
                    en: ['Gothic', 'Moorish/North African', 'Baroque', 'Art Deco'],
                },
                correctIndex: 1,
            },
            {
                id: 'q5_4',
                text: {
                    pt: 'Qual artesanato tradicional é famoso na região do Algarve?',
                    es: '¿Qué artesanía tradicional es famosa en la región del Algarve?',
                    fr: 'Quel artisanat traditionnel est célèbre dans la région de l\'Algarve ?',
                    de: 'Welches traditionelle Handwerk ist in der Algarve-Region berühmt?',
                    en: 'Which traditional craft is famous in the Algarve region?',
                },
                options: {
                    pt: ['Tapeçaria de Arraiolos', 'Cerâmica e azulejos', 'Bordado da Madeira', 'Filigrana de Gondomar'],
                    es: ['Tapicería de Arraiolos', 'Cerámica y azulejos', 'Bordado de Madeira', 'Filigrana de Gondomar'],
                    fr: ['Tapisserie d\'Arraiolos', 'Céramique et azulejos', 'Broderie de Madère', 'Filigrane de Gondomar'],
                    de: ['Arraiolos-Teppiche', 'Keramik und Azulejos', 'Madeira-Stickerei', 'Gondomar-Filigran'],
                    en: ['Arraiolos tapestry', 'Ceramics and tiles', 'Madeira embroidery', 'Gondomar filigree'],
                },
                correctIndex: 1,
            },
        ],
    },
];

// Get a random quiz with even distribution
export const getRandomQuiz = (): Quiz => {
    const randomIndex = Math.floor(Math.random() * quizzes.length);
    return quizzes[randomIndex];
};

// Get quiz by ID
export const getQuizById = (id: number): Quiz | undefined => {
    return quizzes.find((q) => q.id === id);
};
