'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useRouter } from 'next/navigation';
import * as api from '@/lib/api/client';
import { homePathForUserType } from '@/lib/auth/routes';
import {
  clearSessionCookies,
  getAccessToken,
  setUserTypeCookie,
} from '@/lib/auth/session';
import type { AuthUser, LoginRequest, SignupRequest } from '@/lib/types/auth';

interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  login: (payload: LoginRequest) => Promise<void>;
  signup: (payload: SignupRequest) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<AuthUser | null>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const refreshSeq = useRef(0);

  const refreshUser = useCallback(async (): Promise<AuthUser | null> => {
    const seq = ++refreshSeq.current;
    const token = getAccessToken();
    if (!token) {
      if (seq === refreshSeq.current) setUser(null);
      return null;
    }
    try {
      const { user: profile } = await api.getMe();
      if (seq !== refreshSeq.current) return null;
      setUser(profile);
      setUserTypeCookie(profile.userType);
      return profile;
    } catch {
      if (seq !== refreshSeq.current) return null;
      clearSessionCookies();
      setUser(null);
      return null;
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const token = getAccessToken();
      if (!token) {
        queueMicrotask(() => {
          if (!cancelled) {
            setUser(null);
            setLoading(false);
          }
        });
        return;
      }
      await refreshUser();
      if (!cancelled) setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [refreshUser]);

  const login = useCallback(
    async (payload: LoginRequest) => {
      refreshSeq.current += 1;
      await api.login(payload);
      const profile = await refreshUser();
      if (!profile) {
        throw new Error('Failed to load profile after login');
      }
      router.push(homePathForUserType(profile.userType));
      router.refresh();
    },
    [router, refreshUser]
  );

  const signup = useCallback(
    async (payload: SignupRequest) => {
      refreshSeq.current += 1;
      await api.signup(payload);
      const profile = await refreshUser();
      if (!profile) {
        throw new Error('Failed to load profile after signup');
      }
      router.push(homePathForUserType(profile.userType));
      router.refresh();
    },
    [router, refreshUser]
  );

  const logout = useCallback(async () => {
    refreshSeq.current += 1;
    await api.logout();
    clearSessionCookies();
    setUser(null);
    router.push('/login');
    router.refresh();
  }, [router]);

  const value = useMemo(
    () => ({ user, loading, login, signup, logout, refreshUser }),
    [user, loading, login, signup, logout, refreshUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
}
