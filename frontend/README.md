# Earnio Frontend

Next.js 16 web application for the Earnio UGC platform. Serves both marketing pages and authenticated creator/sponsor dashboards.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Architecture

### Key technologies
- **Framework:** Next.js 16 with App Router and Turbopack
- **Styling:** Tailwind CSS 4
- **State:** React Context (auth), localStorage + sessionStorage (persistence)
- **API client:** `lib/api/client.ts` — REST calls with token refresh and error handling
- **Authentication:** httpOnly cookies + JWT tokens from Supabase

### File structure

```
frontend/
├── app/                    # Routes (App Router)
│   ├── (auth)/            # Auth pages: login, signup, password reset, email verification
│   ├── (creator)/         # Creator app: dashboard, sponsorships, wallet
│   ├── (sponsor)/         # Sponsor app: campaigns, applications
│   └── layout.tsx         # Root layout with theme provider
├── components/
│   ├── auth/              # Login, signup, password reset, email verification forms
│   ├── landing/           # Hero, features, FAQ, testimonials
│   ├── dashboard/         # Creator/sponsor dashboards
│   ├── layout/            # App shells, navigation, headers
│   └── ui/                # Shared buttons, inputs, modals
├── contexts/              # React Context (auth state)
├── hooks/                 # Custom hooks (useAuth, useEmailVerification, etc.)
├── lib/
│   ├── api/              # API client functions (client.ts, dashboard.ts, etc.)
│   ├── auth/             # Auth helpers (session mgmt, token persistence)
│   ├── i18n/             # Translations (English, Mongolian)
│   └── types/            # TypeScript types (auth, API responses)
└── public/               # Static assets
```

## Authentication Flow

### Login / Signup
1. User submits email + password on `/login/creator` or `/signup/creator`
2. Backend validates credentials and returns `accessToken` + user profile
3. Frontend stores token in httpOnly cookie + memory cache
4. `AuthContext` persists login state to localStorage + sessionStorage
5. Middleware (`proxy.ts`) checks auth on every request; redirects to login if missing
6. Dashboard loads with token attached to all API requests

### Password Reset
1. User clicks "Forgot Password" on login page → `/forgot-password`
2. Submits email; backend sends reset link with 32-byte token (SHA256 hashed)
3. Link includes token as URL param → `/reset-password?token=xxx&email=...`
4. On mount, verifies token with backend; shows countdown timer (60 min expiry)
5. User submits new password; backend validates, hashes, updates DB
6. Auto-logs in user with new token

### Email Verification (2FA)
1. After signup, user sees verification prompt
2. Clicks "Send verification email" → backend sends 6-digit code
3. User enters code; each failed attempt is tracked (max 3 before lockout)
4. On success, marks account verified; prevents takeover attacks
5. Can resend codes without hitting attempt counter

## Key Components

### Auth components

| Component | Path | Purpose |
|-----------|------|---------|
| `AuthForm` | `components/auth/AuthForm.tsx` | Base login/signup form with email/password fields |
| `ForgotPasswordForm` | `components/auth/ForgotPasswordForm.tsx` | Email submission for password reset |
| `ResetPasswordForm` | `components/auth/ResetPasswordForm.tsx` | Token validation + new password form |
| `UsernameInput` | `components/auth/UsernameInput.tsx` | Real-time availability checking (300ms debounce) |
| `EmailVerificationForm` | `components/auth/EmailVerificationForm.tsx` | 6-digit code submission |
| `ProtectedRoute` | `components/auth/ProtectedRoute.tsx` | Wrapper enforcing authentication + role-based access |

### API client functions

**Core auth** (`lib/api/client.ts`):
- `login(payload)` — Email/password login
- `signup(payload)` — Create new account
- `logout()` — Clear session
- `getMe()` — Fetch current user profile
- `deleteAccount(password)` — Delete account (password-protected)

**Password reset**:
- `forgotPassword({ email })` — Request reset link (rate limit: 3/30min)
- `verifyResetToken({ token, email })` — Validate token + expiry
- `resetPassword({ token, email, newPassword })` — Complete reset (rate limit: 2/60min)

**Email verification**:
- `sendVerificationEmail({ userId, email })` — Send 6-digit code (rate limit: 5/15min)
- `verifyEmail({ userId, code })` — Verify code (max 3 attempts)
- `resendVerificationEmail({ userId })` — Resend code; resets attempts

**Username validation**:
- `checkUsernameAvailability(username)` — Check if username is taken

## Custom Hooks

### useAuth
```typescript
const { user, isLoading, login, signup, logout, isCreator, isSponsor } = useAuth();
```
Manages authentication state, login/logout, and user profile. Persists session across page reloads.

### useEmailVerification
```typescript
const {
  sending,
  verifying,
  error,
  success,
  sendVerificationEmail,
  verifyEmail,
  resendVerificationEmail,
  reset
} = useEmailVerification();
```
Handles email verification UI state and API calls. Auto-resets on success.

### useLocalStorage / useSessionStorage
Custom hooks for reading/writing browser storage with type safety and event listeners.

## Styling & Theme

### Design tokens
Centralized in `tailwind.config.ts`:
- **Colors:** Earnio Purple (`#6336F1`), slate ink ramp, cyan spark accents
- **Border radius:** 8px for all components
- **Typography:** Poppins (headings), Montserrat (body)
- **Dark mode:** System-aware toggle with localStorage persistence

### Dark mode
Toggle in navigation (icon in header). Theme stored in localStorage; respects system preference on first visit. All components use Tailwind dark mode utilities (`dark:bg-slate-900`, etc.).

## Internationalization (i18n)

Two languages supported: English (default) and Mongolian.

**Language keys** defined in:
- `lib/i18n/en.ts` — English translations
- `lib/i18n/mn.ts` — Mongolian translations

**Usage:**
```typescript
import { translations } from '@/lib/i18n/en';
<h1>{translations.forgot_password_title}</h1>
```

**30+ new keys added for password reset & email verification:**
- `forgot_password_title`, `forgot_password_description`, `reset_password_title`, `new_password`, `confirm_password`, `password_requirements`, `token_expires_in`, `invalid_token`, etc.
- `username_available`, `username_already_taken`, `checking_availability`, etc.

See `lib/i18n/mn.ts` for Mongolian equivalents.

## Rate Limits

Frontend respects backend rate limits:

| Feature | Limit | Window |
|---------|-------|--------|
| Forgot Password | 3 | 30 minutes |
| Reset Password | 2 | 60 minutes |
| Email Verification | 5 | 15 minutes |
| Login / Signup | 5 | 15 minutes |

Hitting a limit returns HTTP 429; UI displays "Too many requests. Try again later."

## Route Protection

### Middleware (`proxy.ts`)
- Checks `ct-access-token` cookie on every request
- Redirects unauthenticated users to `/login`
- Enforces role-based routing:
  - Creator routes (`/dashboard`, `/sponsorships`, etc.) — redirect to `/sponsor/dashboard` if user is sponsor
  - Sponsor routes (`/sponsor/*`) — redirect to `/dashboard` if user is creator

### ProtectedRoute component
Reusable wrapper for page-level protection:
```typescript
<ProtectedRoute requiredUserType="creator">
  <DashboardPage />
</ProtectedRoute>
```

## Environment Variables

Create `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

In production, set to backend domain (e.g., `https://api.earnio.app`).

## Development

### Commands
```bash
npm run dev          # Start dev server (Turbopack)
npm run build        # Production build
npm run start        # Run production build locally
npm run lint         # ESLint
npm run type-check   # TypeScript check
```

### Adding new auth features
1. **New endpoint?** Add function to `lib/api/client.ts` using `apiFetch()`
2. **New form?** Create component in `components/auth/`; use `useAuth()` or `useEmailVerification()` hooks for state
3. **Need translations?** Add keys to `lib/i18n/en.ts` and `lib/i18n/mn.ts`
4. **Page route?** Create folder in `app/(auth)/` using App Router conventions

### Testing auth flow
```
Creator signup → /signup/creator → Fill form → Hit /api/auth/signup → Redirected to /dashboard
Password reset → /login → "Forgot password" link → /forgot-password → Enter email → Check backend logs for reset email
Email verification → After signup, fill in code → /api/auth/verify-email
```

## Deployment

See [../docs/DEPLOYMENT.md](../docs/DEPLOYMENT.md) for production setup on Vercel.

## Further Reading

- [Next.js documentation](https://nextjs.org/docs)
- [Tailwind CSS docs](https://tailwindcss.com/docs)
- [Supabase auth docs](https://supabase.com/docs/guides/auth)
- [../docs/FRONTEND.md](../docs/FRONTEND.md) — Landing pages, design system, route map
- [../SECURITY_AUDIT.md](../SECURITY_AUDIT.md) — Security implementation details
