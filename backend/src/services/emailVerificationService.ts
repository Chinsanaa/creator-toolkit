import { randomInt } from 'node:crypto';
import { supabaseAdmin } from '../database/supabase';
import emailService from './emailService';

interface EmailVerificationPayload {
  userId: string;
  email: string;
}

interface VerificationCodeCheck {
  valid: boolean;
  userId?: string;
  expiresIn?: number;
}

class EmailVerificationService {
  private readonly CODE_LENGTH = 6;
  private readonly CODE_EXPIRY_MINUTES = 15;
  private readonly MAX_ATTEMPTS = 3;

  private generateVerificationCode(): string {
    return randomInt(100000, 999999).toString();
  }

  public async sendVerificationEmail(payload: EmailVerificationPayload): Promise<void> {
    const { userId, email } = payload;

    if (!email?.trim() || !userId?.trim()) {
      throw new Error('User ID and email are required');
    }

    if (!supabaseAdmin) {
      throw new Error('Email verification service is temporarily unavailable');
    }

    // The endpoint is unauthenticated, so the email must be proven to belong to
    // this user before a code is issued — otherwise anyone could get a code for
    // an arbitrary user delivered to an address they control.
    const { data: user, error: userError } = await supabaseAdmin
      .from('users')
      .select('name, email')
      .eq('id', userId)
      .single();

    if (userError || !user || user.email?.toLowerCase() !== email.toLowerCase().trim()) {
      throw new Error('User not found');
    }

    const verificationCode = this.generateVerificationCode();
    const expiresAt = new Date(Date.now() + this.CODE_EXPIRY_MINUTES * 60 * 1000).toISOString();

    // Store verification code
    const { error: insertError } = await supabaseAdmin
      .from('email_verification_codes')
      .insert({
        user_id: userId,
        email: email.toLowerCase().trim(),
        code: verificationCode,
        expires_at: expiresAt,
        attempts: 0,
      });

    if (insertError) {
      console.error('Failed to create verification code:', insertError);
      throw new Error('Failed to send verification email');
    }

    // Send email
    await emailService.sendVerificationEmail({
      to: email,
      userName: user.name || email.split('@')[0],
      verificationCode,
      expiresInMinutes: this.CODE_EXPIRY_MINUTES,
    });

    console.log(`Verification email sent to: ${email}`);
  }

  public async verifyEmailCode(userId: string, code: string): Promise<VerificationCodeCheck> {
    if (!userId?.trim() || !code?.trim()) {
      return { valid: false };
    }

    if (!supabaseAdmin) {
      return { valid: false };
    }

    // Find the verification code
    const { data: codeRecord, error } = await supabaseAdmin
      .from('email_verification_codes')
      .select('id, user_id, expires_at, attempts')
      .eq('user_id', userId)
      .eq('code', code.trim())
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error || !codeRecord) {
      // Increment attempts for invalid code attempts
      const { data: latestCode } = await supabaseAdmin
        .from('email_verification_codes')
        .select('id, attempts')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (latestCode) {
        const newAttempts = (latestCode.attempts ?? 0) + 1;
        if (newAttempts >= this.MAX_ATTEMPTS) {
          // Lock the code after max attempts
          await supabaseAdmin
            .from('email_verification_codes')
            .update({ attempts: newAttempts, code: null })
            .eq('id', latestCode.id);
        } else {
          await supabaseAdmin
            .from('email_verification_codes')
            .update({ attempts: newAttempts })
            .eq('id', latestCode.id);
        }
      }
      return { valid: false };
    }

    // Check if code is expired
    const expiresAt = new Date(codeRecord.expires_at);
    if (expiresAt < new Date()) {
      return { valid: false };
    }

    // Check if max attempts exceeded
    if ((codeRecord.attempts ?? 0) >= this.MAX_ATTEMPTS) {
      return { valid: false };
    }

    const expiresIn = Math.floor((expiresAt.getTime() - Date.now()) / 1000);

    return {
      valid: true,
      userId: codeRecord.user_id,
      expiresIn: Math.max(0, expiresIn),
    };
  }

  public async confirmEmailVerification(userId: string, code: string): Promise<void> {
    const verification = await this.verifyEmailCode(userId, code);

    if (!verification.valid) {
      throw new Error('Invalid or expired verification code');
    }

    if (!supabaseAdmin) {
      throw new Error('Email verification service is temporarily unavailable');
    }

    // Mark email as verified in users table
    const { error: updateError } = await supabaseAdmin
      .from('users')
      .update({ is_verified: true })
      .eq('id', userId);

    if (updateError) {
      console.error('Failed to update user verification status:', updateError);
      throw new Error('Failed to verify email');
    }

    // Delete all verification codes for this user
    await supabaseAdmin
      .from('email_verification_codes')
      .delete()
      .eq('user_id', userId);

    console.log(`Email verified for user: ${userId}`);
  }

  public async resendVerificationEmail(userId: string): Promise<void> {
    if (!userId?.trim()) {
      throw new Error('User ID is required');
    }

    if (!supabaseAdmin) {
      throw new Error('Email verification service is temporarily unavailable');
    }

    // Get user email
    const { data: user, error: userError } = await supabaseAdmin
      .from('users')
      .select('id, email, is_verified')
      .eq('id', userId)
      .single();

    if (userError || !user) {
      throw new Error('User not found');
    }

    if (user.is_verified) {
      throw new Error('Email is already verified');
    }

    // Delete old verification codes
    await supabaseAdmin
      .from('email_verification_codes')
      .delete()
      .eq('user_id', userId);

    // Send new verification email
    await this.sendVerificationEmail({
      userId,
      email: user.email,
    });
  }
}

export default new EmailVerificationService();
