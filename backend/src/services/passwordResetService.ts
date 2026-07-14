import { randomBytes, createHash } from 'crypto';
import { createAnonClient, supabaseAdmin } from '../database/supabase';
import { validatePassword, getPasswordErrorMessage } from '../utils/passwords';
import emailService from './emailService';
import authService, { AuthResponse } from './authService';

interface PasswordResetPayload {
  email: string;
}

interface ResetPasswordPayload {
  token: string;
  email: string;
  newPassword: string;
}

interface TokenVerification {
  valid: boolean;
  expiresIn?: number;
  userId?: string;
}

class PasswordResetService {
  private readonly TOKEN_LENGTH = 32;
  private readonly TOKEN_EXPIRY_MINUTES = parseInt(process.env.PASSWORD_RESET_TOKEN_EXPIRY_MINUTES || '60', 10);

  private generateToken(): string {
    return randomBytes(this.TOKEN_LENGTH).toString('base64url');
  }

  private hashToken(token: string): string {
    return createHash('sha256').update(token).digest('hex');
  }

  public async initiatePasswordReset(payload: PasswordResetPayload): Promise<void> {
    const { email } = payload;

    if (!email?.trim()) {
      throw new Error('Email is required');
    }

    if (!supabaseAdmin) {
      throw new Error('Password reset service is temporarily unavailable');
    }

    // Look up user by email
    const { data: users, error } = await supabaseAdmin
      .from('users')
      .select('id, name, email')
      .eq('email', email.toLowerCase().trim())
      .single();

    if (error || !users) {
      // For security: don't reveal if email exists
      console.log(`Password reset requested for non-existent email: ${email}`);
      return;
    }

    // Generate token and hash
    const token = this.generateToken();
    const tokenHash = this.hashToken(token);
    const expiresAt = new Date(Date.now() + this.TOKEN_EXPIRY_MINUTES * 60 * 1000).toISOString();

    // Store token hash in database
    const { error: insertError } = await supabaseAdmin
      .from('password_reset_tokens')
      .insert({
        user_id: users.id,
        token_hash: tokenHash,
        expires_at: expiresAt,
      });

    if (insertError) {
      console.error('Failed to create password reset token:', insertError);
      throw new Error('Failed to initiate password reset');
    }

    // Send reset email
    const resetLink = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${encodeURIComponent(token)}&email=${encodeURIComponent(email)}`;

    await emailService.sendPasswordResetEmail({
      to: email,
      userName: users.name || email.split('@')[0],
      resetLink,
      expiresInMinutes: this.TOKEN_EXPIRY_MINUTES,
    });

    console.log(`Password reset email sent to: ${email}`);
  }

  public async verifyResetToken(token: string, email: string): Promise<TokenVerification> {
    if (!token?.trim() || !email?.trim()) {
      return { valid: false };
    }

    if (!supabaseAdmin) {
      return { valid: false };
    }

    const tokenHash = this.hashToken(token);

    // Find the token and verify it's valid
    const { data: tokenRecord, error } = await supabaseAdmin
      .from('password_reset_tokens')
      .select('id, user_id, expires_at, used_at')
      .eq('token_hash', tokenHash)
      .single();

    if (error || !tokenRecord) {
      return { valid: false };
    }

    // Check if token is already used
    if (tokenRecord.used_at) {
      return { valid: false };
    }

    // Check if token is expired
    const expiresAt = new Date(tokenRecord.expires_at);
    if (expiresAt < new Date()) {
      return { valid: false };
    }

    // Verify email matches the user account
    const { data: user, error: userError } = await supabaseAdmin
      .from('users')
      .select('id, email')
      .eq('id', tokenRecord.user_id)
      .single();

    if (userError || !user || user.email.toLowerCase() !== email.toLowerCase().trim()) {
      return { valid: false };
    }

    const expiresIn = Math.floor((expiresAt.getTime() - Date.now()) / 1000);

    return {
      valid: true,
      expiresIn: Math.max(0, expiresIn),
      userId: tokenRecord.user_id,
    };
  }

  public async resetPassword(payload: ResetPasswordPayload): Promise<AuthResponse> {
    const { token, email, newPassword } = payload;

    if (!token?.trim() || !email?.trim() || !newPassword) {
      throw new Error('Invalid password reset request');
    }

    // Verify token
    const verification = await this.verifyResetToken(token, email);
    if (!verification.valid || !verification.userId) {
      throw new Error('Password reset link has expired or is invalid. Please request a new one.');
    }

    // Validate password
    const strength = validatePassword(newPassword);
    if (!strength.isValid) {
      const errorMessage = getPasswordErrorMessage(newPassword);
      throw new Error(errorMessage || 'Password does not meet security requirements');
    }

    if (!supabaseAdmin) {
      throw new Error('Password reset service is temporarily unavailable');
    }

    // Get the user's Supabase auth ID and email for auth update
    const { data: userProfile, error: profileError } = await supabaseAdmin
      .from('users')
      .select('id, email, name')
      .eq('id', verification.userId)
      .single();

    if (profileError || !userProfile) {
      throw new Error('User account not found');
    }

    // Update password in Supabase Auth
    const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(
      verification.userId,
      { password: newPassword }
    );

    if (updateError) {
      console.error('Failed to update password:', updateError);
      throw new Error('Failed to reset password. Please try again.');
    }

    // Invalidate every active reset token for this user (including the one just used)
    await supabaseAdmin
      .from('password_reset_tokens')
      .update({ used_at: new Date().toISOString() })
      .eq('user_id', verification.userId)
      .is('used_at', null);

    // Send security notification email
    await emailService.sendPasswordChangedEmail({
      to: userProfile.email,
      userName: userProfile.name || userProfile.email.split('@')[0],
      changedAt: new Date().toLocaleString(),
    });

    // Sign in the user automatically after password reset
    const { data, error } = await createAnonClient().auth.signInWithPassword({
      email: userProfile.email,
      password: newPassword,
    });

    if (error || !data.session || !data.user) {
      throw new Error('Password reset successful, but automatic login failed. Please log in manually.');
    }

    // Get full user profile
    const user = await authService.getProfile(data.user.id, data.session.access_token);

    return {
      user,
      accessToken: data.session.access_token,
      refreshToken: data.session.refresh_token,
    };
  }
}

export default new PasswordResetService();
