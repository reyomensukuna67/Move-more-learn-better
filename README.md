# Move More, Learn Better — Petition Website

A React + Supabase petition site. Frontend is fully built; backend (database,
security rules, edge function) is already deployed to your Supabase project.

## What's already done for you

- **Supabase project**: `move-more-learn-better` (region: ap-south-1)
- **Database tables**: `signatures`, `messages`, `submission_log`, `admins`
- **Row Level Security**: enabled on every table. The public can only insert
  signatures/messages and read two safe views (`supporter_count`,
  `public_messages`) — never raw rows. Only accounts listed in `admins` can
  read/manage raw data.
- **Edge Function** `submit-petition`: handles every signature submission
  server-side — verifies the CAPTCHA, enforces rate limiting (max 3
  submissions per IP per hour), validates input, and writes to the database.
  Nothing sensitive is ever done from the browser.
- **Live counter**: realtime via Supabase subscriptions, animates on change.
- **Admin dashboard**: at `/admin`, requires Supabase auth login + being in
  the `admins` table.

## Two things you need to set up yourself

### 1. Cloudflare Turnstile (CAPTCHA) — required before going live
The `.env` file currently has Cloudflare's **public test key**
(`1x00000000000000000000AA`), which always passes and does **not** actually
block spam. To get real protection:

1. Go to https://dash.cloudflare.com/ → Turnstile → Add a site (it's free).
2. Add your domain, get a **Site Key** and a **Secret Key**.
3. Put the Site Key in `.env` as `VITE_TURNSTILE_SITE_KEY`.
4. Set the Secret Key on the Supabase Edge Function (not in frontend code):
   ```
   supabase secrets set TURNSTILE_SECRET_KEY=your_secret_key --project-ref wawsrgxzlbnosweqnubd
   ```
   Or via the Supabase dashboard → Edge Functions → submit-petition → Secrets.

### 2. Create your first admin account
No admin exists yet. To create one:

1. In the Supabase dashboard → Authentication → Users → **Add user**, create
   yourself an account with email + password.
2. Copy that user's UUID.
3. Run this SQL in the Supabase SQL editor:
   ```sql
   insert into public.admins (user_id) values ('paste-the-uuid-here');
   ```
4. Log in at `yoursite.com/admin` with that email/password.

## Running locally

```
npm install
npm run dev
```

## Deploying

```
npm run build
```
Deploy the `dist/` folder to Vercel, Netlify, or any static host. The
Supabase URL and anon key in `.env` are safe to ship in the built frontend —
they're public by design, and RLS is what actually protects your data.

## Project structure

- `src/components/Hero.jsx`, `About.jsx`, `Suggestions.jsx` — marketing sections
- `src/components/Petition.jsx` — the signature form (calls the edge function)
- `src/components/Counter.jsx` — live animated supporter count
- `src/components/Messages.jsx` — approved supporter quotes
- `src/components/FAQ.jsx`, `Footer.jsx`, `Navbar.jsx` — supporting sections
- `src/components/Admin.jsx` — password-protected admin dashboard
- `src/lib/supabase.js` — Supabase client setup
