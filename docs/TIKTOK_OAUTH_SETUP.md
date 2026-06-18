# TikTok OAuth Setup Guide

This guide walks you through setting up TikTok OAuth authentication for the Creator Toolkit platform connection feature.

## Overview

The TikTok OAuth flow allows creators to connect their TikTok accounts securely without sharing passwords. The infrastructure is currently set up to:

1. Request authorization from TikTok
2. Exchange authorization codes for access tokens
3. Store tokens securely in the database
4. Use tokens to fetch creator analytics (mock data for now)

## Prerequisites

- **TikTok Developer Account** — Create one at https://developers.tiktok.com/
- **TikTok App** — Create a new app in your developer dashboard

## Step-by-Step Setup

### 1. Create a TikTok Developer App

1. Go to [TikTok Developer Portal](https://developers.tiktok.com/)
2. Sign in with your account (create one if needed)
3. Navigate to **My Apps** → **Create an app**
4. Fill in:
   - **App name**: e.g., "Creator Toolkit Local Dev" (or your production name)
   - **Application type**: Select "Web" or "Desktop" as appropriate
   - **Use case**: Select something like "Analytics" or "Creator Tools"
5. Accept the terms and create the app
6. You should now see your **Client Key** and **Client Secret**

### 2. Configure OAuth Redirect URI

In your TikTok app settings:

1. Find **Redirect URLs** or **OAuth URLs** section
2. Add your redirect URL:
   - **Local development**: `http://localhost:3000/auth/tiktok-callback`
   - **Production**: `https://your-domain.com/auth/tiktok-callback`
3. Save the changes

⚠️ **Important**: The redirect URI must exactly match what you configure in your backend `.env` file as `BACKEND_REDIRECT_URI`.

### 3. Configure Environment Variables

Copy your credentials to `backend/.env`:

```bash
TIKTOK_CLIENT_ID=your-client-key-from-step-1
TIKTOK_CLIENT_SECRET=your-client-secret-from-step-1
BACKEND_REDIRECT_URI=http://localhost:3000/auth/tiktok-callback  # or your production URL
```

### 4. Request Required Scopes

When connecting, the app requests these scopes:
- `user.info.basic` — Access to basic user profile info
- `video.list` — Access to user's video list

You may need to request these scopes in the TikTok Developer Dashboard if they're not available by default.

### 5. Test the Flow

1. Start the backend server: `cd backend && npm run dev`
2. Start the frontend: `cd frontend && npm run dev`
3. Log in to the app
4. Go to **Platforms** page
5. Click **Connect with TikTok**
6. You'll be redirected to TikTok to authorize
7. After authorizing, you'll be redirected back and the account should connect

## Current Implementation

### What's Working

✅ OAuth authorization flow (redirect to TikTok)  
✅ Token exchange (code → access/refresh tokens)  
✅ Secure token storage in database  
✅ UI for initiating OAuth connection  
✅ Callback handler page  

### What's Next (In Progress)

🚧 Fetch real TikTok earnings data using access token  
🚧 Fetch creator profile info (username, follower count, etc.)  
🚧 Handle token refresh when tokens expire  

For now, the app stores mock earnings after sync, similar to the username-based connection.

## Troubleshooting

### "OAuth is not configured"

**Error**: `TikTok OAuth is not configured`

**Solution**: Check that you've set all three env vars:
- `TIKTOK_CLIENT_ID`
- `TIKTOK_CLIENT_SECRET`
- `BACKEND_REDIRECT_URI`

Restart the backend after adding them.

### "Invalid redirect URI"

**Error**: `The redirect_uri in the request does not match the registered redirect_uri`

**Solution**: The `BACKEND_REDIRECT_URI` must exactly match what's configured in your TikTok app settings. No trailing slashes, exact protocol (http vs https), etc.

### "Failed to connect TikTok account"

**Error**: During OAuth callback

**Solution**: 
1. Check browser console for more details
2. Check backend logs (`npm run dev` output)
3. Verify the code was sent to the callback endpoint
4. Ensure the user is still logged in (session might have expired)

### Token Not Storing

If tokens aren't being stored:

1. Check that the migration ran: `supabase migration list`
2. If migration is missing, run: `supabase migration up`
3. Verify the columns exist: `SELECT oauth_access_token FROM platform_accounts LIMIT 1;` in Supabase

## API Endpoints

### Generate Authorization URL

```
GET /api/auth/tiktok/authorize
Response: { authUrl: "https://www.tiktok.com/v1/oauth/authorize?..." }
```

The frontend calls this to get the URL where the user should be redirected.

### Handle OAuth Callback

```
POST /api/auth/tiktok/callback
Body: { code: "authorization_code_from_tiktok" }
Response: { account: { id, platform, platform_username } }
```

Called by the callback page after user authorizes on TikTok.

## Future Enhancements

1. **Real API Calls**: Replace mock earnings with actual TikTok Analytics API calls
2. **Profile Sync**: Fetch creator's TikTok username and follower count from API
3. **Token Refresh**: Implement automatic refresh before expiry
4. **Revocation**: Allow users to disconnect and revoke access
5. **Multiple Accounts**: Support connecting multiple TikTok accounts

## References

- [TikTok OAuth Documentation](https://developers.tiktok.com/doc/login-kit-oauth)
- [TikTok Analytics API](https://developers.tiktok.com/doc/tiktok-api/)
- [Scopes Reference](https://developers.tiktok.com/doc/permission-scopes)

---

**Need help?** Check `backend/src/services/tiktokOAuthService.ts` for the service implementation, or `backend/src/routes/auth.ts` for the route handlers.
