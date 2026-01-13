# Deployment Guide: Vercel + Supabase

## Part 1: Supabase Setup (Database)

### Step 1: Create Supabase Account
1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project" and sign up with GitHub
3. It's **FREE** for up to 500MB database and 2 projects

### Step 2: Create New Project
1. Click "New Project"
2. Fill in:
   - **Name**: `quiz-olhao-fitur-2026`
   - **Database Password**: Generate a strong password (save it!)
   - **Region**: Choose `eu-west-1` (Ireland) for Portugal
3. Wait 2-3 minutes for project to be ready

### Step 3: Run Database Schema
1. Go to **SQL Editor** in the left sidebar
2. Click "New query"
3. Copy the contents of `docs/database-schema.sql`
4. Paste into the SQL editor
5. Click "Run" (or Ctrl+Enter)
6. You should see "Success. No rows returned"

### Step 4: Get Your Keys
1. Go to **Settings** → **API**
2. Copy these values:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: `eyJhbGciOiJIUzI1...`
   - **service_role key**: `eyJhbGciOiJIUzI1...` (click "Reveal" to see)

⚠️ **IMPORTANT**: Keep the `service_role` key secret! Never expose it in client code.

---

## Part 2: Vercel Setup (Hosting)

### Step 1: Push Code to GitHub
1. Create a new GitHub repository
2. Push your code:
```bash
cd CMO_Quiz
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/quiz-olhao.git
git push -u origin main
```

### Step 2: Create Vercel Account
1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up" and connect with GitHub
3. It's **FREE** for personal projects

### Step 3: Import Project
1. Click "Add New..." → "Project"
2. Select your GitHub repository
3. Vercel auto-detects Next.js

### Step 4: Configure Environment Variables
Before clicking Deploy, add these environment variables:

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Your Supabase service_role key |
| `ADMIN_PASSWORD` | Choose a secure password for admin |

### Step 5: Deploy
1. Click "Deploy"
2. Wait 2-3 minutes for build
3. Your site is live at: `https://your-project.vercel.app`

---

## Part 3: Custom Domain (Optional)

### Using Your Own Domain
1. In Vercel, go to **Settings** → **Domains**
2. Add your domain (e.g., `quiz.cm-olhao.pt`)
3. Update your DNS:
   - Add CNAME record: `quiz` → `cname.vercel-dns.com`
   - Or use Vercel nameservers

---

## Part 4: QR Code Generation

### Recommended Tool
Use [QR Code Generator](https://www.qr-code-generator.com/)

### Steps
1. Enter your Vercel URL
2. Download as PNG or SVG
3. Print at minimum **3cm × 3cm**

### Tips for Trade Fair
- Print multiple sizes (3cm, 5cm, 10cm)
- Test scanning under different lighting
- Include a backup URL printed below the QR code

---

## Troubleshooting

### Issue: "Supabase not configured" in Admin
- Check environment variables are set correctly in Vercel
- Redeploy after adding variables

### Issue: Duplicate email error not working
- Make sure you ran the database schema with UNIQUE index
- Check Supabase logs for errors

### Issue: Admin login not working
- Verify `ADMIN_PASSWORD` environment variable
- Try a simpler password first to test

---

## Cost Summary

| Service | Plan | Cost |
|---------|------|------|
| Supabase | Free tier | €0 |
| Vercel | Hobby | €0 |
| Domain | Optional | ~€10/year |
| **Total** | | **€0-10** |

Both free tiers are more than sufficient for a 2-week trade fair event.

---

## Support

For issues, check:
- [Supabase Docs](https://supabase.com/docs)
- [Vercel Docs](https://vercel.com/docs)
- [Next.js Docs](https://nextjs.org/docs)
