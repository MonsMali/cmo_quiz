import { Quiz } from '@/types';

// 5 quizzes with 4 questions each = 20 total questions
// All translated to PT, ES, FR, DE, EN

export const quizzes: Quiz[] = [
    // Quiz 1: User's sample questions about Ria Formosa & Olhão basics
    {
        id: 1,
        questions: [
            {
                id: 'q1_1',
                text: {
                    pt: 'Qual é a capital da Ria Formosa?',
                    es: '¿Cuál es la capital de Ría Formosa?',
                    fr: 'Quelle est la capitale de Ria Formosa ?',
                    de: 'Was ist die Hauptstadt der Ria Formosa?',
                    en: 'What is the capital of Ria Formosa?',
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
                    pt: 'Qual é o principal parque natural associado ao concelho de Olhão?',
                    es: '¿Cuál es el principal parque natural asociado al municipio de Olhão?',
                    fr: 'Quel est le principal parc naturel associé à la municipalité d\'Olhão ?',
                    de: 'Welcher ist der wichtigste Naturpark, der mit der Gemeinde Olhão verbunden ist?',
                    en: 'What is the main natural park associated with the municipality of Olhão?',
                },
                options: {
                    pt: ['Parque Natural da Costa Vicentina', 'Parque Natural da Ria Formosa', 'Parque Natural do Sudoeste Alentejano', 'Parque Natural do Guadiana'],
                    es: ['Parque Natural de Costa Vicentina', 'Parque Natural de Ría Formosa', 'Parque Natural del Suroeste Alentejano', 'Parque Natural del Guadiana'],
                    fr: ['Parc Naturel de Costa Vicentina', 'Parc Naturel de Ria Formosa', 'Parc Naturel du Sud-Ouest Alentejano', 'Parc Naturel du Guadiana'],
                    de: ['Naturpark Costa Vicentina', 'Naturpark Ria Formosa', 'Naturpark Südwest-Alentejo', 'Naturpark Guadiana'],
                    en: ['Costa Vicentina Natural Park', 'Ria Formosa Natural Park', 'Southwest Alentejo Natural Park', 'Guadiana Natural Park'],
                },
                correctIndex: 1,
            },
            {
                id: 'q1_3',
                text: {
                    pt: 'Qual destas ilhas pertence ao concelho de Olhão?',
                    es: '¿Cuál de estas islas pertenece al municipio de Olhão?',
                    fr: 'Laquelle de ces îles appartient à la municipalité d\'Olhão ?',
                    de: 'Welche dieser Inseln gehört zur Gemeinde Olhão?',
                    en: 'Which of these islands belongs to the municipality of Olhão?',
                },
                options: {
                    pt: ['Ilha de Tavira', 'Ilha do Farol', 'Ilha da Culatra', 'Ilha da Armona'],
                    es: ['Isla de Tavira', 'Isla del Farol', 'Isla de Culatra', 'Isla de Armona'],
                    fr: ['Île de Tavira', 'Île du Farol', 'Île de Culatra', 'Île d\'Armona'],
                    de: ['Insel Tavira', 'Insel Farol', 'Insel Culatra', 'Insel Armona'],
                    en: ['Tavira Island', 'Farol Island', 'Culatra Island', 'Armona Island'],
                },
                correctIndex: 3,
            },
            {
                id: 'q1_4',
                text: {
                    pt: 'Qual é o edifício histórico mais emblemático junto à frente ribeirinha de Olhão?',
                    es: '¿Cuál es el edificio histórico más emblemático junto al paseo marítimo de Olhão?',
                    fr: 'Quel est le bâtiment historique le plus emblématique du front de mer d\'Olhão ?',
                    de: 'Was ist das markanteste historische Gebäude an der Uferpromenade von Olhão?',
                    en: 'What is the most iconic historic building along the Olhão waterfront?',
                },
                options: {
                    pt: ['Forte do Rato', 'Mercado Municipal de Olhão', 'Forte de Cacela', 'Palácio Estoi'],
                    es: ['Fuerte do Rato', 'Mercado Municipal de Olhão', 'Fuerte de Cacela', 'Palacio Estoi'],
                    fr: ['Fort do Rato', 'Marché Municipal d\'Olhão', 'Fort de Cacela', 'Palais d\'Estoi'],
                    de: ['Fort do Rato', 'Markthalle von Olhão', 'Fort Cacela', 'Palast von Estoi'],
                    en: ['Fort do Rato', 'Olhão Municipal Market', 'Cacela Fort', 'Estoi Palace'],
                },
                correctIndex: 1,
            },
        ],
    },

    // Quiz 2: Olhão History & Economy
    {
        id: 2,
        questions: [
            {
                id: 'q2_1',
                text: {
                    pt: 'Olhão é tradicionalmente conhecido por qual atividade económica?',
                    es: 'Olhão es tradicionalmente conocido por qué actividad económica?',
                    fr: 'Olhão est traditionnellement connu pour quelle activité économique ?',
                    de: 'Wofür ist Olhão traditionell wirtschaftlich bekannt?',
                    en: 'Olhão is traditionally known for which economic activity?',
                },
                options: {
                    pt: ['Agricultura cerealífera', 'Indústria automóvel', 'Pesca e indústria conserveira', 'Mineração'],
                    es: ['Agricultura cerealera', 'Industria automotriz', 'Pesca e industria conservera', 'Minería'],
                    fr: ['Agriculture céréalière', 'Industrie automobile', 'Pêche et industrie conservière', 'Exploitation minière'],
                    de: ['Getreideanbau', 'Automobilindustrie', 'Fischerei und Konservenindustrie', 'Bergbau'],
                    en: ['Grain agriculture', 'Automotive industry', 'Fishing and canning industry', 'Mining'],
                },
                correctIndex: 2,
            },
            {
                id: 'q2_2',
                text: {
                    pt: 'Em que século Olhão ganhou o estatuto de vila?',
                    es: '¿En qué siglo Olhão obtuvo el estatus de villa?',
                    fr: 'Au cours de quel siècle Olhão a-t-il obtenu le statut de ville ?',
                    de: 'In welchem Jahrhundert erhielt Olhão den Status einer Stadt?',
                    en: 'In which century did Olhão gain town status?',
                },
                options: {
                    pt: ['Século XVII', 'Século XVIII', 'Século XIX', 'Século XX'],
                    es: ['Siglo XVII', 'Siglo XVIII', 'Siglo XIX', 'Siglo XX'],
                    fr: ['XVIIe siècle', 'XVIIIe siècle', 'XIXe siècle', 'XXe siècle'],
                    de: ['17. Jahrhundert', '18. Jahrhundert', '19. Jahrhundert', '20. Jahrhundert'],
                    en: ['17th century', '18th century', '19th century', '20th century'],
                },
                correctIndex: 2,
            },
            {
                id: 'q2_3',
                text: {
                    pt: 'Qual é o nome do bairro típico de Olhão conhecido pelas suas casas cúbicas?',
                    es: '¿Cuál es el nombre del barrio típico de Olhão conocido por sus casas cúbicas?',
                    fr: 'Quel est le nom du quartier typique d\'Olhão connu pour ses maisons cubiques ?',
                    de: 'Wie heißt das typische Viertel von Olhão, das für seine Würfelhäuser bekannt ist?',
                    en: 'What is the name of the typical Olhão neighborhood known for its cubic houses?',
                },
                options: {
                    pt: ['Bairro da Barreta', 'Bairro dos Pescadores', 'Bairro Alto', 'Bairro da Mouraria'],
                    es: ['Barrio de la Barreta', 'Barrio de los Pescadores', 'Barrio Alto', 'Barrio de la Mouraria'],
                    fr: ['Quartier de Barreta', 'Quartier des Pêcheurs', 'Quartier Haut', 'Quartier de la Mouraria'],
                    de: ['Barreta-Viertel', 'Fischerviertel', 'Oberstadt', 'Mouraria-Viertel'],
                    en: ['Barreta neighborhood', 'Fishermen\'s Quarter', 'Upper Town', 'Mouraria neighborhood'],
                },
                correctIndex: 1,
            },
            {
                id: 'q2_4',
                text: {
                    pt: 'Por que feito histórico Olhão é celebrado relacionado com as invasões francesas?',
                    es: '¿Por qué hazaña histórica es celebrado Olhão relacionada con las invasiones francesas?',
                    fr: 'Pour quel fait historique Olhão est-il célébré en rapport avec les invasions françaises ?',
                    de: 'Für welche historische Tat wird Olhão im Zusammenhang mit den französischen Invasionen gefeiert?',
                    en: 'For what historic feat is Olhão celebrated related to the French invasions?',
                },
                options: {
                    pt: ['Foi a primeira vila a render-se', 'Pescadores navegaram até ao Brasil com notícias da libertação', 'Construção de um forte naval', 'Assinatura de um tratado de paz'],
                    es: ['Fue la primera villa en rendirse', 'Pescadores navegaron hasta Brasil con noticias de la liberación', 'Construcción de un fuerte naval', 'Firma de un tratado de paz'],
                    fr: ['C\'était la première ville à se rendre', 'Des pêcheurs ont navigué jusqu\'au Brésil avec des nouvelles de la libération', 'Construction d\'un fort naval', 'Signature d\'un traité de paix'],
                    de: ['Es war die erste Stadt, die sich ergab', 'Fischer segelten nach Brasilien mit Nachrichten von der Befreiung', 'Bau einer Marinefestung', 'Unterzeichnung eines Friedensvertrags'],
                    en: ['It was the first town to surrender', 'Fishermen sailed to Brazil with news of liberation', 'Construction of a naval fort', 'Signing of a peace treaty'],
                },
                correctIndex: 1,
            },
        ],
    },

    // Quiz 3: Gastronomy & Products
    {
        id: 3,
        questions: [
            {
                id: 'q3_1',
                text: {
                    pt: 'Qual é o prato tradicional de marisco mais famoso do Algarve?',
                    es: '¿Cuál es el plato tradicional de mariscos más famoso del Algarve?',
                    fr: 'Quel est le plat de fruits de mer traditionnel le plus célèbre de l\'Algarve ?',
                    de: 'Was ist das berühmteste traditionelle Meeresfrüchtegericht der Algarve?',
                    en: 'What is the most famous traditional seafood dish of the Algarve?',
                },
                options: {
                    pt: ['Caldeirada de peixe', 'Paella', 'Bouillabaisse', 'Fish and chips'],
                    es: ['Caldeirada de pescado', 'Paella', 'Bouillabaisse', 'Fish and chips'],
                    fr: ['Caldeirada de poisson', 'Paella', 'Bouillabaisse', 'Fish and chips'],
                    de: ['Fisch-Caldeirada', 'Paella', 'Bouillabaisse', 'Fish and chips'],
                    en: ['Fish caldeirada', 'Paella', 'Bouillabaisse', 'Fish and chips'],
                },
                correctIndex: 0,
            },
            {
                id: 'q3_2',
                text: {
                    pt: 'Qual fruto seco é típico da região do Algarve?',
                    es: '¿Qué fruto seco es típico de la región del Algarve?',
                    fr: 'Quel fruit à coque est typique de la région de l\'Algarve ?',
                    de: 'Welche Nuss ist typisch für die Algarve-Region?',
                    en: 'Which nut is typical of the Algarve region?',
                },
                options: {
                    pt: ['Castanha', 'Amêndoa', 'Noz', 'Avelã'],
                    es: ['Castaña', 'Almendra', 'Nuez', 'Avellana'],
                    fr: ['Châtaigne', 'Amande', 'Noix', 'Noisette'],
                    de: ['Kastanie', 'Mandel', 'Walnuss', 'Haselnuss'],
                    en: ['Chestnut', 'Almond', 'Walnut', 'Hazelnut'],
                },
                correctIndex: 1,
            },
            {
                id: 'q3_3',
                text: {
                    pt: 'Qual é a bebida tradicional destilada do Algarve feita de medronho?',
                    es: '¿Cuál es la bebida tradicional destilada del Algarve hecha de madroño?',
                    fr: 'Quelle est la boisson traditionnelle distillée de l\'Algarve faite d\'arbouses ?',
                    de: 'Was ist das traditionelle destillierte Getränk der Algarve aus Erdbeerbaumfrüchten?',
                    en: 'What is the traditional distilled drink from the Algarve made from arbutus berries?',
                },
                options: {
                    pt: ['Vinho do Porto', 'Ginjinha', 'Aguardente de Medronho', 'Licor Beirão'],
                    es: ['Vino de Oporto', 'Ginjinha', 'Aguardiente de Madroño', 'Licor Beirão'],
                    fr: ['Vin de Porto', 'Ginjinha', 'Eau-de-vie d\'Arbouse', 'Liqueur Beirão'],
                    de: ['Portwein', 'Ginjinha', 'Medronho-Schnaps', 'Beirão-Likör'],
                    en: ['Port wine', 'Ginjinha', 'Medronho brandy', 'Beirão liqueur'],
                },
                correctIndex: 2,
            },
            {
                id: 'q3_4',
                text: {
                    pt: 'Qual doce tradicional algarvio é feito com amêndoas e ovos?',
                    es: '¿Qué dulce tradicional del Algarve está hecho con almendras y huevos?',
                    fr: 'Quel dessert traditionnel de l\'Algarve est fait d\'amandes et d\'œufs ?',
                    de: 'Welche traditionelle Süßigkeit der Algarve wird aus Mandeln und Eiern hergestellt?',
                    en: 'Which traditional Algarve sweet is made with almonds and eggs?',
                },
                options: {
                    pt: ['Pastel de nata', 'Dom Rodrigo', 'Queijada de Sintra', 'Pão de ló'],
                    es: ['Pastel de nata', 'Dom Rodrigo', 'Queijada de Sintra', 'Pão de ló'],
                    fr: ['Pastel de nata', 'Dom Rodrigo', 'Queijada de Sintra', 'Pão de ló'],
                    de: ['Pastel de nata', 'Dom Rodrigo', 'Queijada de Sintra', 'Pão de ló'],
                    en: ['Pastel de nata', 'Dom Rodrigo', 'Sintra cheese tart', 'Sponge cake'],
                },
                correctIndex: 1,
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
