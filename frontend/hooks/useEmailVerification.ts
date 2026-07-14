import { useState, useCallback } from 'react';
import * as api from '@/lib/api/client';

export interface UseEmailVerificationState {
  sending: boolean;
  verifying: boolean;
  error: string | null;
  success: boolean;
}

export function useEmailVerification() {
  const [state, setState] = useState<UseEmailVerificationState>({
    sending: false,
    verifying: false,
    error: null,
    success: false,
  });

  const sendVerificationEmail = useCallback(async () => {
    setState((prev) => ({ ...prev, sending: true, error: null, success: false }));
    try {
      await api.sendVerificationEmail();
      setState((prev) => ({ ...prev, success: true, sending: false }));
      return true;
    } catch (err) {
      const message = err instanceof api.ApiError ? err.message : 'Failed to send verification email';
      setState((prev) => ({ ...prev, error: message, sending: false }));
      return false;
    }
  }, []);

  const verifyEmail = useCallback(async (code: string) => {
    setState((prev) => ({ ...prev, verifying: true, error: null, success: false }));
    try {
      await api.verifyEmail(code);
      setState((prev) => ({ ...prev, success: true, verifying: false }));
      return true;
    } catch (err) {
      const message = err instanceof api.ApiError ? err.message : 'Failed to verify email';
      setState((prev) => ({ ...prev, error: message, verifying: false }));
      return false;
    }
  }, []);

  const resendVerificationEmail = useCallback(async () => {
    setState((prev) => ({ ...prev, sending: true, error: null, success: false }));
    try {
      await api.resendVerificationEmail();
      setState((prev) => ({ ...prev, success: true, sending: false }));
      return true;
    } catch (err) {
      const message = err instanceof api.ApiError ? err.message : 'Failed to resend verification email';
      setState((prev) => ({ ...prev, error: message, sending: false }));
      return false;
    }
  }, []);

  const reset = useCallback(() => {
    setState({
      sending: false,
      verifying: false,
      error: null,
      success: false,
    });
  }, []);

  return {
    ...state,
    sendVerificationEmail,
    verifyEmail,
    resendVerificationEmail,
    reset,
  };
}
