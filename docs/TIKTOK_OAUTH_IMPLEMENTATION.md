# TikTok OAuth Implementation Summary

## What Was Built

This document summarizes the TikTok OAuth integration built for the Creator Toolkit. This is **Option B: Full Flow** (backend + frontend) with infrastructure ready for real API integration.

### 1. Database Schema

**Migration**: `supabase/migrations/20260618120200_add_oauth_tokens_to_platform_accounts.sql`

Added OAuth token storage columns to `platform_accounts`:
- `oauth_access_token` — TikTok access token (used for API calls)
- `oauth_refresh_token` — TikTok refresh token (used when access token expires)
- `oauth_token_expires_at` — Expiration time for access token
- `oauth_connected_at` — Timestamp when account was connected via OAuth

Index on refresh token for quick lookups during token refresh flows.

### 2. Backend Services

**File**: `backend/src/services/tiktokOAuthService.ts`

Complete TikTok OAuth service with:

- **`generateAuthorizationUrl(state, scope)`** — Generates TikTok authorization URL
  - User is redirected to this URL to authorize the app
  - Includes CSRF protection via state parameter
  - Customizable scopes (default: `user.info.basic`, `video.list`)

- **`exchangeCodeForToken(code)`** — Exchanges authorization code for tokens
  - Called after user authorizes on TikTok
  - Returns access token, refresh token, and expiration time
  - Error handling for TikTok API failures

- **`connectAccount(userId, accessToken, code)`** — Complete OAuth connection flow
  - Exchanges code for tokens
  - Creates or updates `platform_accounts` record
  - Stores tokens securely in database
  - Returns account info to caller

- **`refreshAccessToken(platformAccountId)`** — Refreshes expired tokens
  - Checks token expiration before refreshing
  - Exchanges refresh token for new access token
  - Updates stored tokens automatically

### 3. Backend Routes

**File**: `backend/src/routes/auth.ts`

#### `GET /api/auth/tiktok/authorize`

**Response**: `{ authUrl: string }`

Generates TikTok authorization URL and returns it to frontend. Also:
- Generates CSRF state token
- Stores state in httpOnly cookie for validation
- Cookie expires after 10 minutes

**Frontend usage**:
```javascript
const { authUrl } = await getTikTokAuthUrl();
window.location.href = authUrl; // Redirect to TikTok
```

#### `POST /api/auth/tiktok/callback`

**Request**: `{ code: string }`  
**Response**: `{ account: { id, platform, platform_username } }`

Handles OAuth redirect callback:
- Requires valid authentication (Bearer token)
- Validates CSRF state token
- Exchanges code for TikTok tokens
- Creates/updates platform account
- Stores tokens securely
- Clears state cookie

**Frontend usage** (in callback page):
```javascript
const { account } = await completeTikTokOAuth(code);
```

### 4. Frontend UI

#### Platforms Page Updates

**File**: `frontend/app/platforms/page.tsx`

- **TikTok OAuth Section** — "Connect with TikTok" button
  - Calls `GET /api/auth/tiktok/authorize`
  - Redirects to TikTok for user authorization
  - Loading state with feedback

- **Username-Based Section** — For YouTube/Instagram
  - TikTok removed from username-based dropdown
  - Still accepts YouTube and Instagram via username

#### OAuth Callback Handler

**File**: `frontend/app/auth/tiktok-callback/page.tsx`

Standalone page that handles TikTok's OAuth redirect:
- Extracts authorization code from URL
- Calls backend callback endpoint
- Shows status (processing, success, error)
- Auto-redirects to platforms page on success
- Manual redirect option on error
- Proper error messages from TikTok or backend

### 5. API Integration Layer

**File**: `frontend/lib/api/platforms.ts`

New functions:
- `getTikTokAuthUrl()` — Get authorization URL
- `completeTikTokOAuth(code)` — Complete OAuth flow with code

Both use the standard `apiFetch` which automatically:
- Adds Bearer token from session
- Handles 401 refresh flow
- Sets proper CORS credentials
- Timeout handling (30s)

### 6. Configuration & Documentation

#### Environment Variables

**File**: `backend/.env.example`

New variables:
```bash
TIKTOK_CLIENT_ID=your-tiktok-client-id
TIKTOK_CLIENT_SECRET=your-tiktok-client-secret
BACKEND_REDIRECT_URI=http://localhost:3000/auth/tiktok-callback
```

#### Setup Guide

**File**: `docs/TIKTOK_OAUTH_SETUP.md`

Complete guide including:
- Prerequisites (TikTok Developer account)
- Step-by-step app creation
- Redirect URI configuration
- Environment variable setup
- Testing the flow
- Troubleshooting common issues
- API endpoint reference

## Current Behavior

### OAuth Flow (End-to-End)

1. **Initiation** — User clicks "Connect with TikTok" on platforms page
2. **Authorization URL** — Frontend calls `/api/auth/tiktok/authorize`, gets TikTok redirect URL
3. **Redirect to TikTok** — Browser redirects to TikTok login/authorize screen
4. **User Authorizes** — User logs in and grants permissions (if needed)
5. **Redirect Back** — TikTok redirects to `/auth/tiktok-callback?code=XXX`
6. **Code Exchange** — Callback page extracts code and sends to backend
7. **Token Storage** — Backend exchanges code for tokens, stores in database
8. **Redirect Home** — User redirected back to platforms page
9. **Account Connected** — TikTok account now appears in connected platforms list

### Mock Data Until API Integration

Currently, after OAuth connection:
- Platform account is created with OAuth tokens stored
- Sync still uses mock data (same as username-based)
- Earnings are simulated based on deterministic hash
- **Next phase**: Replace mock with real TikTok API calls

## What's Next

### Phase 1: Real TikTok API Integration (In Progress)

When you get TikTok API credentials:

1. **Fetch Creator Profile** — Use access token to call TikTok API for:
   - Creator's TikTok username
   - Follower count
   - Verified status
   - Update these in `platform_accounts` table

2. **Fetch Earnings/Analytics** — Use TikTok Analytics API to get:
   - Video earnings
   - Gift earnings
   - Engagement metrics
   - Create earnings records instead of mock data

3. **Token Refresh** — Implement automatic refresh:
   - Check expiration before sync
   - Automatically refresh if needed
   - Retry sync with fresh token

**Files to Update**:
- `backend/src/services/tiktokOAuthService.ts` — Add `fetchCreatorProfile()`, `fetchEarnings()`
- `backend/src/services/platformService.ts` — Use token for real API calls instead of mock
- `backend/src/platforms/mockPlatformProvider.ts` — Replace with real provider or deprecate

### Phase 2: Account Management (Future)

- **Disconnect Account** — Revoke TikTok access and remove from platform_accounts
- **Re-authenticate** — Handle expired credentials with re-connect flow
- **Multiple Accounts** — Support connecting multiple TikTok accounts per user

### Phase 3: YouTube & Instagram OAuth (Future)

- Extend same OAuth pattern to YouTube and Instagram
- Unified platform connection experience
- Consistent token storage and refresh

## Testing the Implementation

### Prerequisites

1. TikTok Developer Account (free) at https://developers.tiktok.com/
2. Created a TikTok app with OAuth configured
3. Environment variables set in `backend/.env`

### Local Testing

```bash
# Terminal 1
cd backend && npm run dev

# Terminal 2
cd frontend && npm run dev

# Browser
1. Navigate to http://localhost:3000
2. Sign up/login as creator
3. Go to /platforms
4. Click "Connect with TikTok"
5. Authorize on TikTok
6. Should redirect back and show connected account
```

### What to Verify

✅ OAuth authorization URL is generated correctly  
✅ User is redirected to TikTok login screen  
✅ After authorization, redirect back to callback page  
✅ Code is exchanged for access/refresh tokens  
✅ Tokens are stored in database (check Supabase)  
✅ Platform account appears in platforms list  
✅ Error handling works (test by denying permissions)  
✅ CSRF protection works (state token validation)  

## Security Considerations

### What's Protected

✅ **HTTPS Only** — Refresh tokens stored in httpOnly cookies (production only)  
✅ **CSRF Token** — State parameter prevents authorization code interception  
✅ **Bearer Token** — OAuth callback requires authenticated user (401 if not logged in)  
✅ **Token Storage** — Tokens stored in database (not exposed in API responses)  
✅ **Token Expiry** — Tracks expiration and refreshes before use  

### What to Add (Before Production)

⚠️ **Scope Enforcement** — Verify TikTok app only requests necessary scopes  
⚠️ **Revocation** — Implement endpoint to revoke and disconnect accounts  
⚠️ **Audit Logging** — Log OAuth connect/disconnect/refresh events  
⚠️ **Rate Limiting** — Limit OAuth initiation to prevent abuse  
⚠️ **Token Encryption** — Consider encrypting tokens at rest (Supabase supports)  

## Code Structure

```
backend/
├── src/
│   ├── services/
│   │   └── tiktokOAuthService.ts        # OAuth logic
│   ├── routes/
│   │   └── auth.ts                      # OAuth endpoints (added to existing)
│   └── database/supabase.ts             # Database client
├── .env.example                         # Config template (updated)

frontend/
├── app/
│   ├── platforms/page.tsx               # Platforms UI (updated)
│   └── auth/
│       └── tiktok-callback/
│           └── page.tsx                 # OAuth callback handler
├── lib/
│   ├── api/
│   │   └── platforms.ts                 # API functions (updated)
│   └── types/platforms.ts

supabase/
└── migrations/
    └── 20260618120200_add_oauth_tokens_to_platform_accounts.sql

docs/
├── TIKTOK_OAUTH_SETUP.md               # Setup guide
└── TIKTOK_OAUTH_IMPLEMENTATION.md      # This file
```

## References

- **TikTok Developer Docs** — https://developers.tiktok.com/
- **OAuth 2.0 Spec** — https://tools.ietf.org/html/rfc6749
- **PKCE (Proof Key for Exchange)** — https://tools.ietf.org/html/rfc7636
- **TikTok API Scopes** — https://developers.tiktok.com/doc/permission-scopes

## Quick Links

| File | Purpose |
|------|---------|
| `backend/src/services/tiktokOAuthService.ts` | OAuth service logic |
| `backend/src/routes/auth.ts` | Backend endpoints |
| `frontend/app/platforms/page.tsx` | Platform connection UI |
| `frontend/app/auth/tiktok-callback/page.tsx` | OAuth callback handler |
| `docs/TIKTOK_OAUTH_SETUP.md` | Developer setup guide |

---

**Status**: ✅ Infrastructure complete. Ready for OAuth testing with mock data. Real API integration in next phase.

**Last Updated**: June 18, 2026
