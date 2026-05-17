import express, { Response } from 'express';
import authService from '../services/authService';
import { verifyToken, AuthRequest } from '../proxy/authProxy';

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
    const { email, password, name, username, phone, userType } = req.body;

    const resolvedType = userType === 'sponsor' ? 'sponsor' : 'creator';

    const result = await authService.signup({
      email,
      password,
      name,
      username,
      phone,
      userType: resolvedType,
    });

    setRefreshTokenCookie(res, result.refreshToken);

    res.status(201).json({
      message: 'User created successfully',
      user: result.user,
      accessToken: result.accessToken,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Signup failed';
    console.error('Signup error:', error);
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
    console.error('Login error:', error);
    res.status(401).json({ error: message });
  }
});

router.post('/logout', async (req: AuthRequest, res: Response) => {
  try {
    await authService.logout();
  } catch (error) {
    console.error('Logout error:', error);
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
    console.error('Refresh error:', error);
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

export default router;
