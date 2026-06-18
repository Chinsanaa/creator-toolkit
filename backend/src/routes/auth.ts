import express, { Response } from 'express';
import { ipKeyGenerator, rateLimit } from 'express-rate-limit';
import authService from '../services/authService';
import passwordResetService from '../services/passwordResetService';
import { verifyToken, AuthRequest } from '../proxy/authProxy';
import { logServerError } from '../utils/serverLog';

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

export default router;
