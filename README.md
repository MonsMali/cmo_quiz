# Quiz Olhao - FITUR 2026

Multilingual quiz website for promotional giveaways at FITUR 2026 trade fair.

**Live URL:** [https://quizolhaofitur.vercel.app](https://quizolhaofitur.vercel.app)

## Features

- **5 Languages**: Portuguese, Spanish, French, German, English
- **Mobile-first**: Optimized for smartphone access via QR code
- **Prize System**: 8 prizes across 4 tiers based on correct answers
- **Admin Dashboard**: View submissions, filter data, export to CSV
- **Celebration Animations**: Confetti for winners
- **Duplicate Prevention**: One submission per email

## Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **Hosting**: Vercel

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Landing page (language selector)
│   ├── quiz/page.tsx         # Quiz interface
│   ├── admin/page.tsx        # Admin dashboard
│   └── api/                   # API routes
├── components/               # React components
├── data/
│   ├── quizzes.ts           # 5 quizzes x 4 questions
│   ├── prizes.ts            # Prize catalog
│   └── translations.ts      # UI translations
├── lib/                     # Utility functions
└── types/                   # TypeScript interfaces
```

## Quiz Content

5 quizzes with 4 questions each covering:
- Ria Formosa & Olhao basics
- History & economy
- Gastronomy & products
- Nature & beaches
- Culture & festivals

## Prize Logic

| Correct Answers | Prize Tier | Prize Pool |
|-----------------|------------|------------|
| 0               | No prize   | -          |
| 1               | Tier 1     | Prize 1-2  |
| 2               | Tier 2     | Prize 3-4  |
| 3               | Tier 3     | Prize 5-6  |
| 4               | Tier 4     | Prize 7-8  |

## Admin Access

1. Navigate to [https://quizolhaofitur.vercel.app/admin](https://quizolhaofitur.vercel.app/admin)
2. Enter the admin password
3. View submissions, filter by language/quiz/tier
4. Export data to CSV

## Local Development

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

Required environment variables:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
ADMIN_PASSWORD=your_secure_admin_password
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deployment

The app is deployed on Vercel and automatically deploys on push to the main branch.

To redeploy manually:
1. Push changes to GitHub
2. Vercel will automatically build and deploy

## QR Code

A QR code is already configured and points to the live quiz URL. QR code assets are stored in the `QRcode/` directory.

## Updating Prize Names

Edit `src/data/prizes.ts` to update prize names.

## License

2026 Camara Municipal de Olhao
