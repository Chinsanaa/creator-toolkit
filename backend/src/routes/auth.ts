import express, { Response } from 'express';
import authService from '../services/authService';
import { verifyToken, AuthRequest } from '../proxy/authProxy';
import { logServerError } from '../utils/serverLog';

const router = express.Router();

const REFRESH_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict' as const,
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

function setRefreshTokenCookie(res: Response, refreshToken: string): void {
  res.cookie('refreshToken', refreshToken, REFRESH_COOKIE_OPTIONS);
}

router.post('/signup', async (req: AuthRequest, res: Response) => {
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
    const message = error instanceof Error ? error.message : 'Signup failed';
    res.status(400).json({ error: message });
  }
});

router.post('/login', async (req: AuthRequest, res: Response) => {
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
    const message = error instanceof Error ? error.message : 'Login failed';
    res.status(401).json({ error: message });
  }
});

router.post('/oauth/session', async (req: AuthRequest, res: Response) => {
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
    const message = error instanceof Error ? error.message : 'OAuth sign-in failed';
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

router.post('/refresh', async (req: AuthRequest, res: Response) => {
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
    const message = error instanceof Error ? error.message : 'Refresh failed';
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
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to fetch profile';
    res.status(500).json({ error: message });
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
    const message = error instanceof Error ? error.message : 'Failed to delete account';
    const status = message.toLowerCase().includes('password') ? 401 : 400;
    if (status >= 500) {
      logServerError('Delete account error', error);
    }
    res.status(status).json({ error: message });
  }
});

export default router;
