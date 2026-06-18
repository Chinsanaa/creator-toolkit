# Earnio — Deployment Guide

> Comprehensive guide for deploying Earnio to production.
> Last updated: June 2026 · Status: Tested and ready for deployment

---

## 📋 Prerequisites Checklist

Before deploying to production:

- [ ] GitHub repository with CI passing
  - [ ] Backend: `npm test` (8 tests pass)
  - [ ] Frontend: `npm run lint && npm run build`
- [ ] Supabase project created
  - [ ] All migrations applied to database (including password reset & email verification tables)
  - [ ] RLS policies reviewed and enabled
  - [ ] Auth users table with proper constraints
  - [ ] Service role key generated and secure
- [ ] Resend account (for email notifications, password reset, email verification)
  - [ ] Domain verified for production sending
  - [ ] API key generated
  - [ ] Email templates tested (signup, password reset, verification code)
  - [ ] Sender email (`EMAIL_FROM`) verified and configured
- [ ] Domain names registered
  - [ ] Frontend domain (e.g., `earnio.app`)
  - [ ] API domain (e.g., `api.earnio.app`)
- [ ] Hosting accounts created
  - [ ] Vercel account for frontend
  - [ ] Railway or Render account for backend
  - [ ] Both connected to GitHub repo

---

## 🚀 Deployment Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Production Setup                     │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  earnio.app                   api.earnio.app           │
│  ├──→ Vercel (frontend)        ├──→ Railway (backend)  │
│  │    Next.js 16              │    Express 5           │
│  │    React 19                │    TypeScript          │
│  │    Tailwind CSS 4          │    Node.js             │
│  │                             │                       │
│  └──────────────┬──────────────┘                       │
│                 │ HTTPS + JWT                          │
│                 ▼                                        │
│          ┌──────────────────┐                          │
│          │   Supabase       │                          │
│          │  PostgreSQL      │                          │
│          │  Auth (JWT)      │                          │
│          │  RLS Policies    │                          │
│          └──────────────────┘                          │
│                 │                                        │
│                 ▼                                        │
│          ┌──────────────────┐                          │
│          │   Resend         │                          │
│          │  Email (SMTP)    │                          │
│          └──────────────────┘                          │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 🔧 Step 1: Prepare Supabase

### 1.1 Create Project

1. Log in to [supabase.com](https://supabase.com)
2. Create a new organization and project
3. Select PostgreSQL version **15+**
4. Choose region close to your target users (Asia-Pacific recommended for Mongolia)

### 1.2 Apply Migrations

1. Download the Supabase CLI: `npm install -g supabase`
2. Link your project:
   ```bash
   supabase link --project-ref <your-project-ref>
   ```
3. Apply migrations:
   ```bash
   supabase db push
   ```
4. Verify in Supabase dashboard that tables exist:
   - `users` (linked to `auth.users`)
   - `platform_accounts`
   - `earnings`
   - `sponsorships`
   - `applications`
   - `wallet_transactions`
   - `bank_accounts`
   - `notifications`

### 1.3 Verify RLS Policies

1. In Supabase dashboard, go to **Authentication** → **Policies**
2. Confirm RLS is **enabled** on all tables
3. Review policies ensure:
   - Users can only access their own data
   - Sponsors can only access their own campaigns/applications
   - Public reads are restricted (health check endpoints only)

### 1.4 Get Credentials

From Supabase dashboard:
- Project URL: **Settings** → **API** → **Project URL**
- Anon key: **Settings** → **API** → **Anon public key**
- Service role key: **Settings** → **API** → **Service role key** (keep secret!)

---

## 🌐 Step 2: Deploy Frontend to Vercel

### 2.1 Import Repository

1. Go to [vercel.com](https://vercel.com)
2. Click **New Project** → **Import Git Repository**
3. Select your Earnio repository
4. Choose framework: **Next.js**
5. Set **Root Directory** to `frontend`

### 2.2 Configure Environment Variables

In Vercel project settings, add environment variables:

| Variable | Value | Notes |
|----------|-------|-------|
| `NEXT_PUBLIC_API_URL` | `https://api.yourdomain.com` | Backend API base URL |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxx.supabase.co` | From Supabase dashboard |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJ...` | From Supabase dashboard |

**Important:** These are public and exposed in browser; don't add secrets here.

### 2.3 Deploy

1. Click **Deploy**
2. Wait for build to complete (5-10 minutes)
3. Vercel provides a production URL: `earnio-xxx.vercel.app`
4. Set up custom domain:
   - Go to **Settings** → **Domains**
   - Add your domain (e.g., `earnio.app`)
   - Add CNAME record to your DNS pointing to Vercel

### 2.4 Verify Frontend

```bash
# Check home page loads
curl https://earnio.app

# Check login page works
curl https://earnio.app/login/creator
```

---

## 🛠 Step 3: Deploy Backend to Railway or Render

### Option A: Railway

1. Go to [railway.app](https://railway.app)
2. Click **New Project** → **Deploy from GitHub**
3. Select your Earnio repository
4. Create **New Service** → **Node**
5. Configure:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
6. Add environment variables (see table below)
7. Railway auto-deploys on git push; grab the URL

### Option B: Render

1. Go to [render.com](https://render.com)
2. Click **New** → **Web Service**
3. Connect your GitHub repo
4. Configure:
   - **Name:** `earnio-api`
   - **Environment:** Node
   - **Root Directory:** `backend` (if not auto-detected)
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
5. Add environment variables (see table below)
6. Click **Create Web Service**

### Backend Environment Variables

Set these in your Railway/Render dashboard:

| Variable | Value | Notes |
|----------|-------|-------|
| `NODE_ENV` | `production` | Enables production optimizations |
| `PORT` | `3001` (or let platform auto-assign) | Railway/Render injects this |
| `FRONTEND_URL` | `https://earnio.app` | CORS origin; no trailing slash |
| `SUPABASE_URL` | `https://xxx.supabase.co` | From Supabase |
| `SUPABASE_ANON_KEY` | `eyJ...` | From Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJ...` | **REQUIRED**; keep secret |
| `RESEND_API_KEY` | `re_xxx...` | From Resend dashboard |
| `EMAIL_FROM` | `noreply@earnio.app` | Verified sender domain |
| `ENABLE_SYNC_CRON` | `false` | Disable in-process scheduler; use external cron |
| `SYNC_CRON_SECRET` | Random 32+ char string | Protects `/api/sync/cron` endpoint |

### Backend Domain Setup

1. Get the API URL from Railway/Render
2. Create DNS CNAME:
   - Subdomain: `api.earnio.app`
   - Points to: (Railway/Render URL)
3. Wait for DNS propagation (5-30 minutes)

---

## 📧 Step 4: Configure Resend for Email

### 4.1 Set Up Resend Account

1. Go to [resend.com](https://resend.com)
2. Create account and verify email
3. Go to **Domains** section
4. Add your domain (e.g., `earnio.app`)
5. Follow instructions to add DNS records:
   - Add `CNAME` record for DKIM
   - Add `MX` record for receiving (if needed)

### 4.2 Verify Domain

Once DNS records are propagated:
1. Return to Resend → **Domains**
2. Click **Verify** on your domain
3. Once verified, status should show **Verified**

### 4.3 Get API Key

1. Go to **API Keys**
2. Create new API key
3. Copy the key
4. Add to backend environment variables as `RESEND_API_KEY`

### 4.4 Test Email

After deployment, test via API:

```bash
curl -X POST https://api.earnio.app/api/health \
  -H "Content-Type: application/json"
```

Should return email provider status in health check.

---

## 🔐 Step 4.5: Configure Password Reset & Email Verification

### 4.5.1 Password Reset Configuration

Password reset tokens have configurable expiry via environment variables:

| Variable | Default | Purpose |
|----------|---------|---------|
| `PASSWORD_RESET_TOKEN_EXPIRY_MINUTES` | `60` | How long reset link remains valid |
| `FRONTEND_URL` | (required) | Used in reset link; must match your frontend domain |

**Email template:** Backend sends password reset email from `EMAIL_FROM` with:
- Reset link: `https://yourfrontend.com/reset-password?token=...&email=...`
- Token expiry countdown
- Security notice: "If you didn't request this, ignore it."

**Rate limit:** 3 forgot-password requests per 30 minutes per IP

### 4.5.2 Email Verification Configuration

Email verification uses 6-digit codes sent via Resend:

| Variable | Default | Purpose |
|----------|---------|---------|
| `EMAIL_VERIFICATION_CODE_EXPIRY_MINUTES` | `15` | Code validity period |
| `EMAIL_VERIFICATION_MAX_ATTEMPTS` | `3` | Failed verification attempts before lockout |

**Email template:** Backend sends verification code with:
- Large 6-digit code (easy to read)
- Code expiry time
- Resend link for new code
- Security notice about not sharing code

**Rate limits:**
- 5 verification email sends per 15 minutes per IP
- 5 verification attempts per 15 minutes per IP
- Unlimited resends (resets attempt counter)

### 4.5.3 Database Tables

Ensure Supabase migrations include:

```sql
-- Password reset tokens
CREATE TABLE password_reset_tokens (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id),
  token_hash TEXT NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE,
  used_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE
);

-- Email verification
CREATE TABLE email_verification (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id),
  email TEXT NOT NULL,
  code TEXT NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE,
  attempts INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE
);
```

Run migrations:
```bash
supabase db push
```

### 4.5.4 Test Password Reset

After deployment:

```bash
# Request password reset
curl -X POST https://api.earnio.app/api/auth/forgot-password \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'

# Check Resend logs for reset email
```

### 4.5.5 Test Email Verification

```bash
# Send verification code (requires authenticated request)
curl -X POST https://api.earnio.app/api/auth/send-verification-email \
  -H "Authorization: Bearer <access-token>" \
  -H "Content-Type: application/json" \
  -d '{"userId":"<user-id>","email":"test@example.com"}'

# Check Resend logs for verification email
```

---

## 🔄 Step 5: Set Up Platform Sync (External Cron)

### Option A: GitHub Actions Cron

Create `.github/workflows/sync-cron.yml`:

```yaml
name: Platform Sync Cron

on:
  schedule:
    - cron: '0 */6 * * *'  # Every 6 hours

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger sync endpoint
        run: |
          curl -X POST https://api.earnio.app/api/sync/cron \
            -H "x-cron-secret: ${{ secrets.SYNC_CRON_SECRET }}" \
            -H "Content-Type: application/json"
```

### Option B: External Cron Service

Use EasyCron, AWS EventBridge, Google Cloud Scheduler, or similar:

1. Create cron job with schedule: **Every 6 hours**
2. URL: `https://api.earnio.app/api/sync/cron`
3. Method: **POST**
4. Add header: `x-cron-secret: <your-secret>`

---

## ✅ Step 6: Post-Deployment Verification

### 6.1 Health Checks

```bash
# Frontend loads
curl https://earnio.app

# API is responding
curl https://api.earnio.app/api/health

# Health response should show:
# {
#   "status": "ok",
#   "checks": {
#     "database": "ok",
#     "serviceRole": "ok",
#     "email": "ok",
#     "syncCron": "ok"
#   }
# }
```

### 6.2 Authentication Flow

1. Open https://earnio.app
2. Click **Get Started** or **/signup/creator**
3. Create a test account
4. Verify you receive welcome email
5. Log in successfully
6. Navigate to `/dashboard` — should load

### 6.3 API Endpoints

```bash
# Test authenticated endpoint (use access token from login)
curl -H "Authorization: Bearer <access-token>" \
  https://api.earnio.app/api/dashboard/summary

# Should return user earnings data
```

### 6.4 Database Connection

Verify in Supabase dashboard:
- **Database** → **Browser** → **users** table shows test account
- **Auth** → **Users** shows test user with email

### 6.5 Email Delivery

Check Resend dashboard:
- **Logs** should show email sent to test account
- Email received in inbox (check spam if needed)

### 6.6 Password Reset Flow

1. Go to `/login/creator`
2. Click **Forgot password?**
3. Enter test email; click **Send reset link**
4. Check email for reset link (Resend logs should show delivery)
5. Click link; should show password form with countdown timer
6. Enter new password; submit
7. Should auto-login and redirect to `/dashboard`

### 6.7 Email Verification Flow

1. Sign up with new email at `/signup/creator`
2. Should see "Verify your email" prompt
3. Click **Send code**
4. Check email for 6-digit code (Resend logs)
5. Enter code in form (6 digits)
6. On success, should show "Email verified" message
7. Try wrong code 3 times; should see "Too many attempts"
8. Click **Resend code** to unlock
9. Enter new code; should verify successfully

---

## 📊 Step 7: Monitor & Maintenance

### Logging & Alerts

- **Vercel**: Logs in **Deployments** tab; set up error alerts in **Settings**
- **Railway/Render**: Logs in dashboard; set up webhook alerts
- **Supabase**: Check **Logs** tab for database errors
- **Resend**: Monitor **Logs** for email failures

### Health Monitoring

Set up periodic checks (e.g., Uptime Robot):

```
GET https://earnio.app → Expect 200
GET https://api.earnio.app/api/health → Expect 200, status="ok"
```

### Backup & Disaster Recovery

- Supabase: Automated backups (check **Settings** → **Backups**)
- GitHub: Always backed up; commits are immutable
- Secrets: Store in LastPass/1Password; never commit `.env` files

---

## 🚨 Troubleshooting

| Issue | Cause | Solution |
|-------|-------|----------|
| Frontend build fails | Missing env vars | Verify `NEXT_PUBLIC_API_URL` in Vercel |
| 502 Bad Gateway | Backend not running | Check Railway/Render logs; restart service |
| 401 on all API calls | Wrong `FRONTEND_URL` | Ensure no trailing slash; matches Vercel domain |
| CORS errors | Wrong CORS origin | Check backend `FRONTEND_URL` env var |
| Email not sending | Resend domain not verified | Verify domain in Resend dashboard |
| Sync cron fails | Wrong secret | Ensure `SYNC_CRON_SECRET` matches in env |
| Database errors | RLS policies broken | Check Supabase → **Logs** for details |

---

## 🎉 You're Live!

Once all steps pass:

1. Create test sponsor account
2. Create test campaign
3. Apply as creator to campaign
4. Approve as sponsor
5. Request payout in wallet
6. Verify all notifications received

For detailed manual QA, see [QA_MANUAL_CHECKLIST.md](./QA_MANUAL_CHECKLIST.md).

---

## 📚 Additional Resources

- [Vercel Docs](https://vercel.com/docs)
- [Railway Docs](https://docs.railway.app)
- [Supabase Docs](https://supabase.com/docs)
- [Resend Docs](https://resend.com/docs)
- [Express Deployment](https://expressjs.com/en/advanced/best-practice-performance.html)
- [Next.js Production Deployment](https://nextjs.org/docs/deployment)
