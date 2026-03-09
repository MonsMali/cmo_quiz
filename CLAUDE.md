# CMO Quiz - Olhão Tourism Quiz

## Project Overview
Multilingual promotional quiz for **Município de Olhão** (CMO) used at international tourism trade fairs. Collects participant data and awards promotional prizes about Olhão, Portugal.

**Current deployment:** Btravel Barcelona (20-22 March 2026)
**Previous deployment:** FITUR 2026 (Madrid)
**Live URL:** https://quizolhaofitur.vercel.app

## Tech Stack
- **Framework:** Next.js 15 (App Router) + React 18 + TypeScript 5
- **Styling:** Tailwind CSS 3
- **Testing:** Vitest + React Testing Library
- **Hosting:** Vercel (standalone output, auto-deploy from `main`)
- **Data persistence:** Google Sheets via Apps Script Web App
- **Animations:** canvas-confetti, CSS transitions

## Key Commands
```bash
npm run dev        # Local development server
npm run build      # Production build
npm run test       # Run Vitest tests
npm run lint       # ESLint
```

## Project Structure
```
src/
├── app/
│   ├── page.tsx              # Landing page (language selector)
│   ├── layout.tsx            # Root layout, metadata, SEO
│   ├── quiz/page.tsx         # Main quiz flow (questions → form → results)
│   ├── admin/page.tsx        # Admin dashboard (submissions, stats, export)
│   └── api/
│       ├── quiz/route.ts     # GET - returns random 4-question quiz
│       ├── submit/route.ts   # POST - validates, scores, assigns prize, saves
│       └── admin/            # Auth, submissions list, CSV export
├── components/               # UI components (UserForm, QuizQuestion, ResultScreen, Timer, etc.)
├── data/
│   ├── quizzes.ts            # 73 questions about Olhão (5 quizzes × ~4 questions)
│   ├── prizes.ts             # 8 prizes across 4 tiers with daily limits
│   └── translations.ts      # 5 languages: PT, ES, FR, DE, EN
├── lib/
│   ├── quizLogic.ts          # Quiz randomization and answer validation
│   ├── prizeLogic.ts         # Prize tier calculation, daily limits, assignment
│   ├── googleSheets.ts       # Google Sheets API integration
│   └── cache.ts              # Request-level caching (O(1) question lookup)
├── types/index.ts            # TypeScript interfaces
└── test/setup.tsx            # Test setup
```

## User Flow
1. **Landing** → Select language (PT/ES/FR/DE/EN)
2. **Quiz** → 4 random questions, 30s timer each, instant feedback
3. **Form** → Name, email, GDPR consent
4. **Submit** → Server validates, calculates score, assigns prize, saves to Google Sheets
5. **Results** → Score display, prize (if won), confetti animation, answer review

## Prize Tiers
| Correct | Tier | Daily Limit |
|---------|------|-------------|
| 0-1 | Tier 1 (Pen) | Unlimited |
| 2 | Tier 2 (Key Holder) | 40/day |
| 3 | Tier 3 (Notepad/Necessaire) | 15/day |
| 4 | Tier 4 (Serrated Bag/Tasting) | Staff-managed |

Tiers downgrade if daily limit is reached (3→2→1).

## Environment Variables
- `GOOGLE_SHEETS_URL` - Google Apps Script Web App URL
- `ADMIN_PASSWORD` - Admin dashboard password

## Important Notes
- Email validation is strict: blocks typos, suspicious patterns, duplicates
- GDPR consent text is in Portuguese (legal requirement)
- All quiz content is about Olhão (geography, history, nature, culture, gastronomy)
- Questions and prizes are fully multilingual (5 languages)
- Confetti component is dynamically imported (no SSR)
- Google Sheets handles: duplicate checking, submission storage, daily prize counts

## Event Adaptation
When adapting for a new trade fair, update:
1. `src/app/layout.tsx` - Page title, metadata, OG tags
2. `.env` / Vercel env vars - Admin password if needed
3. `web app URL.txt` - Reference URL
4. Any event-specific branding or logos in `public/` or `logos/`
