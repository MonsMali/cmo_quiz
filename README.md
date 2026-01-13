# Quiz Olhão - FITUR 2026

🌊 Multilingual quiz website for promotional giveaways at FITUR 2026 trade fair.

## Features

- 🌐 **5 Languages**: Portuguese, Spanish, French, German, English
- 📱 **Mobile-first**: Optimized for smartphone access via QR code
- 🎁 **Prize System**: 8 prizes across 4 tiers based on correct answers
- 📊 **Admin Dashboard**: View submissions, filter data, export to CSV
- 🎉 **Celebration Animations**: Confetti for winners
- 🔒 **Duplicate Prevention**: One submission per email

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **Hosting**: Vercel (free tier)

## Quick Start

### 1. Install Dependencies

```bash
cd C:/CMO_Quiz
npm install
```

### 2. Configure Environment

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

Edit `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
ADMIN_PASSWORD=your_secure_admin_password
```

### 3. Set Up Database

Run the SQL schema in your Supabase SQL Editor (see `docs/database-schema.sql`).

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Demo Mode

If Supabase is not configured, the app runs in **demo mode**:
- Quiz works normally
- Form submissions are not saved to database
- Admin dashboard shows sample data

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Landing page (language selector)
│   ├── quiz/page.tsx         # Quiz interface
│   ├── admin/page.tsx        # Admin dashboard
│   └── api/                  # API routes
├── components/               # React components
├── data/
│   ├── quizzes.ts           # 5 quizzes × 4 questions
│   ├── prizes.ts            # Prize catalog
│   └── translations.ts      # UI translations
├── lib/                     # Utility functions
└── types/                   # TypeScript interfaces
```

## Quiz Content

5 quizzes with 4 questions each covering:
- Ria Formosa & Olhão basics
- History & economy
- Gastronomy & products
- Nature & beaches
- Culture & festivals

## Prize Logic

| Correct Answers | Prize Tier | Prize Pool |
|-----------------|------------|------------|
| 0               | No prize   | —          |
| 1               | Tier 1     | Prize 1-2  |
| 2               | Tier 2     | Prize 3-4  |
| 3               | Tier 3     | Prize 5-6  |
| 4               | Tier 4     | Prize 7-8  |

## Admin Access

1. Navigate to `/admin`
2. Enter the password set in `ADMIN_PASSWORD`
3. View submissions, filter by language/quiz/tier
4. Export data to CSV

## Deployment to Vercel

1. Push code to GitHub
2. Import repository in [Vercel](https://vercel.com)
3. Add environment variables in Settings → Environment Variables
4. Deploy

## QR Code

Generate a QR code pointing to your Vercel URL:
- Use [QR Code Generator](https://www.qr-code-generator.com/)
- Minimum print size: 3cm × 3cm
- Test scanning before printing

## Updating Prize Names

Edit `src/data/prizes.ts` to update placeholder prize names with actual prizes.

## License

© 2026 Câmara Municipal de Olhão
