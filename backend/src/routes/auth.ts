import express, { Response } from 'express';
import { ipKeyGenerator, rateLimit } from 'express-rate-limit';
import authService from '../services/authService';
import passwordResetService from '../services/passwordResetService';
import emailVerificationService from '../services/emailVerificationService';
import tiktokOAuthService from '../services/tiktokOAuthService';
import { verifyToken, AuthRequest } from '../proxy/authProxy';
import { logServerError } from '../utils/serverLog';
import crypto from 'crypto';

const router = express.Router();

const REFRESH_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict' as const,
  maxAge: 365 * 24 * 60 * 60 * 1000,
};

function setRefreshTokenCookie(res: Response, refreshToken: string): void {
  res.cookie('refreshToken', refreshToken, REFRESH_COOKIE_OPTIONS);
}

const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => `${ipKeyGenerator(req.ip ?? '')}:${req.method}:${req.path}`,
  message: { error: 'Too many auth attempts. Please try again later.' },
});

const forgotPasswordRateLimiter = rateLimit({
  windowMs: 30 * 60 * 1000,
  limit: 3,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => `${ipKeyGenerator(req.ip ?? '')}:${req.method}:${req.path}`,
  message: { error: 'Too many password reset requests. Please try again later.' },
});

const resetPasswordRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 2,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => `${ipKeyGenerator(req.ip ?? '')}:${req.method}:${req.path}:${(req.body as { email?: string }).email || ''}`,
  message: { error: 'Too many password reset attempts. Please try again later.' },
});

const SAFE_AUTH_ERRORS = new Set([
  'Missing required fields',
  'You must accept the Terms and Conditions and Privacy Policy',
  'Password must be at least 8 characters',
  'Invalid account type',
  'Username already taken',
  'User with this email already exists',
  'Invalid email or password',
  'Email and password required',
  'Please confirm your email before logging in',
  'Missing OAuth session tokens',
  'Invalid or expired OAuth session',
  'Refresh token not found',
  'Invalid refresh token',
  'Password is required to delete your account',
  'Incorrect password',
  'Account deletion is temporarily unavailable. Please contact support or try again later.',
  'Could not delete account data. Remove active campaigns or pending payouts, then try again.',
  'Failed to delete account. Please try again or contact support.',
  'Email is required',
  'Password reset link has expired or is invalid. Please request a new one.',
  'Invalid password reset request',
  'Password does not meet security requirements',
  'Failed to reset password. Please try again.',
  'Password reset successful, but automatic login failed. Please log in manually.',
  'Password reset service is temporarily unavailable',
  'Invalid or expired verification code',
  'Email verification service is temporarily unavailable',
  'Email is already verified',
  'User not found',
]);

function authErrorMessage(error: unknown, fallback: string): string {
  if (!(error instanceof Error)) return fallback;
  return SAFE_AUTH_ERRORS.has(error.message) ? error.message : fallback;
}

router.post('/signup', authRateLimiter, async (req: AuthRequest, res: Response) => {
  try {
    const { email, password, name, username, phone, userType, acceptedTerms } = req.body;

    const resolvedType = userType === 'sponsor' ? 'sponsor' : 'creator';

    const result = await authService.signup({
      email,
      password,
      name,
      username,
      phone,
      userType: resolvedType,
      acceptedTerms: acceptedTerms === true,
    });

    setRefreshTokenCookie(res, result.refreshToken);

    res.status(201).json({
      message: 'User created successfully',
      user: result.user,
      accessToken: result.accessToken,
    });
  } catch (error: unknown) {
    const message = authErrorMessage(error, 'Signup failed');
    res.status(400).json({ error: message });
  }
});

router.post('/login', authRateLimiter, async (req: AuthRequest, res: Response) => {
  try {
    const { email, password } = req.body;

    const result = await authService.login({
      email,
      password,
    });

    setRefreshTokenCookie(res, result.refreshToken);

    res.json({
      message: 'Login successful',
      user: result.user,
      accessToken: result.accessToken,
    });
  } catch (error: unknown) {
    const message = authErrorMessage(error, 'Login failed');
    res.status(401).json({ error: message });
  }
});

router.post('/oauth/session', authRateLimiter, async (req: AuthRequest, res: Response) => {
  try {
    const { accessToken, refreshToken, userType } = req.body as {
      accessToken?: string;
      refreshToken?: string;
      userType?: string;
    };

    const resolvedType = userType === 'sponsor' ? 'sponsor' : userType === 'creator' ? 'creator' : undefined;

    const result = await authService.finishOAuthSession(
      accessToken ?? '',
      refreshToken ?? '',
      resolvedType
    );

    setRefreshTokenCookie(res, result.refreshToken);

    res.json({
      message: 'Signed in successfully',
      user: result.user,
      accessToken: result.accessToken,
    });
  } catch (error: unknown) {
    const message = authErrorMessage(error, 'OAuth sign-in failed');
    res.status(400).json({ error: message });
  }
});

router.post('/logout', async (req: AuthRequest, res: Response) => {
  try {
    await authService.logout(req.cookies.refreshToken);
  } catch (error) {
    logServerError('Logout error', error);
  }
  res.clearCookie('refreshToken');
  res.json({ message: 'Logged out successfully' });
});

router.post('/refresh', authRateLimiter, async (req: AuthRequest, res: Response) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      res.status(401).json({ error: 'Refresh token not found' });
      return;
    }

    const result = await authService.refreshToken(refreshToken);

    setRefreshTokenCookie(res, result.refreshToken);

    res.json({
      message: 'Token refreshed',
      accessToken: result.accessToken,
    });
  } catch (error: unknown) {
    const message = authErrorMessage(error, 'Refresh failed');
    res.status(401).json({ error: message });
  }
});

router.get('/me', verifyToken, async (req: AuthRequest, res: Response) => {
  try {
    const user = await authService.getProfile(req.userId!, req.token!);

    res.json({
      userId: user.id,
      user,
    });
  } catch {
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

router.delete('/account', verifyToken, async (req: AuthRequest, res: Response) => {
  try {
    const { password } = req.body as { password?: string };
    const profile = await authService.getProfile(req.userId!, req.token!);

    await authService.deleteAccount(req.userId!, profile.email, password ?? '');

    res.clearCookie('refreshToken');
    res.json({ message: 'Account deleted successfully' });
  } catch (error: unknown) {
    const message = authErrorMessage(error, 'Failed to delete account');
    const status = message.toLowerCase().includes('password') ? 401 : 400;
    if (status >= 500) {
      logServerError('Delete account error', error);
    }
    res.status(status).json({ error: message });
  }
});

router.post('/forgot-password', forgotPasswordRateLimiter, async (req: AuthRequest, res: Response) => {
  try {
    const { email } = req.body as { email?: string };

    await passwordResetService.initiatePasswordReset({
      email: email ?? '',
    });

    res.json({
      message: 'If an account exists for this email, you will receive a password reset link shortly.',
    });
  } catch (error: unknown) {
    const message = authErrorMessage(error, 'Failed to initiate password reset');
    res.status(400).json({ error: message });
  }
});

router.post('/verify-reset-token', async (req: AuthRequest, res: Response) => {
  try {
    const { token, email } = req.body as { token?: string; email?: string };

    const verification = await passwordResetService.verifyResetToken(
      token ?? '',
      email ?? ''
    );

    if (!verification.valid) {
      res.status(400).json({
        error: 'Password reset link has expired or is invalid. Please request a new one.',
      });
      return;
    }

    res.json({
      valid: true,
      expiresIn: verification.expiresIn,
    });
  } catch (error: unknown) {
    const message = authErrorMessage(error, 'Token verification failed');
    res.status(400).json({ error: message });
  }
});

router.post('/reset-password', resetPasswordRateLimiter, async (req: AuthRequest, res: Response) => {
  try {
    const { token, email, newPassword } = req.body as {
      token?: string;
      email?: string;
      newPassword?: string;
    };

    const result = await passwordResetService.resetPassword({
      token: token ?? '',
      email: email ?? '',
      newPassword: newPassword ?? '',
    });

    setRefreshTokenCookie(res, result.refreshToken);

    res.json({
      message: 'Password reset successful. You are now logged in.',
      user: result.user,
      accessToken: result.accessToken,
    });
  } catch (error: unknown) {
    const message = authErrorMessage(error, 'Password reset failed');
    res.status(400).json({ error: message });
  }
});

router.post('/check-username', async (req: AuthRequest, res: Response) => {
  try {
    const { username } = req.body as { username?: string };

    if (!username?.trim()) {
      res.status(400).json({ error: 'Username is required' });
      return;
    }

    const isTaken = await authService.isUsernameTaken(username.trim());

    res.json({
      available: !isTaken,
      username: username.trim(),
    });
  } catch (error: unknown) {
    const message = authErrorMessage(error, 'Failed to check username availability');
    res.status(400).json({ error: message });
  }
});

router.post('/send-verification-email', authRateLimiter, async (req: AuthRequest, res: Response) => {
  try {
    const { userId, email } = req.body as { userId?: string; email?: string };

    if (!userId?.trim() || !email?.trim()) {
      res.status(400).json({ error: 'User ID and email are required' });
      return;
    }

    await emailVerificationService.sendVerificationEmail({
      userId: userId.trim(),
      email: email.trim(),
    });

    res.json({
      message: 'Verification email sent',
    });
  } catch (error: unknown) {
    const message = authErrorMessage(error, 'Failed to send verification email');
    res.status(400).json({ error: message });
  }
});

router.post('/verify-email', authRateLimiter, async (req: AuthRequest, res: Response) => {
  try {
    const { userId, code } = req.body as { userId?: string; code?: string };

    if (!userId?.trim() || !code?.trim()) {
      res.status(400).json({ error: 'User ID and verification code are required' });
      return;
    }

    await emailVerificationService.confirmEmailVerification(userId.trim(), code.trim());

    res.json({
      message: 'Email verified successfully',
    });
  } catch (error: unknown) {
    const message = authErrorMessage(error, 'Email verification failed');
    res.status(400).json({ error: message });
  }
});

router.post('/resend-verification-email', authRateLimiter, async (req: AuthRequest, res: Response) => {
  try {
    const { userId } = req.body as { userId?: string };

    if (!userId?.trim()) {
      res.status(400).json({ error: 'User ID is required' });
      return;
    }

    await emailVerificationService.resendVerificationEmail(userId.trim());

    res.json({
      message: 'Verification email resent',
    });
  } catch (error: unknown) {
    const message = authErrorMessage(error, 'Failed to resend verification email');
    res.status(400).json({ error: message });
  }
});

// TikTok OAuth routes for platform connection
router.get('/tiktok/authorize', async (req: AuthRequest, res: Response) => {
  try {
    const state = crypto.randomBytes(16).toString('hex');
    // Store state in session (for basic CSRF protection)
    // In production, store in cache/DB with expiry
    res.cookie('tiktok_oauth_state', state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 10 * 60 * 1000, // 10 minutes
    });

    const authUrl = tiktokOAuthService.generateAuthorizationUrl(state);
    res.json({ authUrl });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to generate TikTok auth URL';
    res.status(400).json({ error: message });
  }
});

router.post('/tiktok/callback', verifyToken, async (req: AuthRequest, res: Response) => {
  try {
    const { code } = req.body as { code?: string };

    if (!code?.trim()) {
      res.status(400).json({ error: 'Authorization code is required' });
      return;
    }

    const state = req.cookies.tiktok_oauth_state;
    if (!state) {
      res.status(400).json({ error: 'Invalid OAuth session. Please try again.' });
      return;
    }

    // Clear the state cookie
    res.clearCookie('tiktok_oauth_state');

    // Connect TikTok platform account
    const account = await tiktokOAuthService.connectAccount(
      req.userId!,
      req.token!,
      code.trim()
    );

    res.json({
      message: 'TikTok account connected successfully',
      account,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to connect TikTok account';
    res.status(400).json({ error: message });
  }
});

export default router;
