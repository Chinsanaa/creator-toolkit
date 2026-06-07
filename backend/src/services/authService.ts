import { randomInt } from 'node:crypto';
import { User } from '@supabase/supabase-js';
import { getAuthenticatedClient, supabase, supabaseAdmin } from '../database/supabase';

export interface SignupPayload {
  email: string;
  password: string;
  name: string;
  username: string;
  phone?: string;
  userType: 'creator' | 'sponsor';
  acceptedTerms?: boolean;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  username: string;
  userType: 'creator' | 'sponsor';
}

export interface AuthResponse {
  user: AuthUser;
  accessToken: string;
  refreshToken: string;
}

type UserRow = {
  id: string;
  email: string;
  name: string;
  username: string;
  user_type: 'creator' | 'sponsor';
};

class AuthService {
  private mapAuthError(message: string, fallback: string): string {
    const lower = message.toLowerCase();
    if (lower.includes('invalid login credentials') || lower.includes('invalid email or password')) {
      return 'Invalid email or password';
    }
    if (lower.includes('user already registered') || lower.includes('already been registered')) {
      return 'User with this email already exists';
    }
    if (lower.includes('email not confirmed')) {
      return 'Please confirm your email before logging in';
    }
    return fallback;
  }

  private normalizeUserType(value: string | null | undefined): 'creator' | 'sponsor' {
    return value?.toLowerCase() === 'sponsor' ? 'sponsor' : 'creator';
  }

  private mapProfile(row: UserRow): AuthUser {
    return {
      id: row.id,
      email: row.email,
      name: row.name,
      username: row.username,
      userType: this.normalizeUserType(row.user_type),
    };
  }

  private mapUserFromMetadata(user: User): AuthUser {
    const meta = user.user_metadata ?? {};
    return {
      id: user.id,
      email: user.email ?? '',
      name: (meta.name as string) ?? (meta.full_name as string) ?? '',
      username: (meta.username as string) ?? '',
      userType: this.normalizeUserType(meta.user_type as string | undefined),
    };
  }

  private isRecentlyCreatedUser(user: User): boolean {
    if (!user.created_at) return false;
    return Date.now() - new Date(user.created_at).getTime() < 5 * 60 * 1000;
  }

  private async generateUniqueUsername(seed: string): Promise<string> {
    const base =
      seed
        .split('@')[0]
        .toLowerCase()
        .replace(/[^a-z0-9_]/g, '')
        .slice(0, 20) || 'user';

    if (!(await this.isUsernameTaken(base))) {
      return base;
    }

    for (let attempt = 0; attempt < 12; attempt += 1) {
      const candidate = `${base}${randomInt(1000, 10_000)}`.slice(0, 30);
      if (!(await this.isUsernameTaken(candidate))) {
        return candidate;
      }
    }

    const fallback = `user_${randomInt(10_000_000, 99_999_999)}`;
    if (!(await this.isUsernameTaken(fallback))) {
      return fallback;
    }

    return `user_${Date.now().toString(36)}`;
  }

  private async ensureOAuthProfile(
    user: User,
    accessToken: string,
    preferredUserType?: 'creator' | 'sponsor'
  ): Promise<AuthUser> {
    let profile: AuthUser;
    try {
      profile = await this.getProfile(user.id, accessToken);
    } catch {
      profile = this.mapUserFromMetadata(user);
    }

    if (!supabaseAdmin) {
      return profile;
    }

    const meta = user.user_metadata ?? {};
    const isNewUser = this.isRecentlyCreatedUser(user);
    const updates: Record<string, string> = {};
    const metaUpdates: Record<string, string> = {};

    if (
      preferredUserType &&
      isNewUser &&
      !meta.user_type &&
      profile.userType !== preferredUserType
    ) {
      updates.user_type = preferredUserType;
      metaUpdates.user_type = preferredUserType;
      profile.userType = preferredUserType;
    }

    const resolvedName =
      profile.name ||
      (meta.name as string | undefined) ||
      (meta.full_name as string | undefined) ||
      '';

    if (!profile.username?.trim()) {
      const seed = user.email ?? user.id;
      const username = await this.generateUniqueUsername(seed);
      updates.username = username;
      metaUpdates.username = username;
      profile.username = username;
    }

    if (!profile.name?.trim() && resolvedName) {
      updates.name = resolvedName;
      metaUpdates.name = resolvedName;
      profile.name = resolvedName;
    } else if (!profile.name?.trim() && profile.username) {
      updates.name = profile.username;
      metaUpdates.name = profile.username;
      profile.name = profile.username;
    }

    const profileWrites: Promise<void>[] = [];

    if (Object.keys(updates).length > 0) {
      profileWrites.push(
        (async () => {
          await supabaseAdmin.from('users').update(updates).eq('id', user.id);
        })()
      );
    }

    if (Object.keys(metaUpdates).length > 0) {
      profileWrites.push(
        (async () => {
          await supabaseAdmin.auth.admin.updateUserById(user.id, {
            user_metadata: { ...meta, ...metaUpdates },
          });
        })()
      );
    }

    if (profileWrites.length > 0) {
      await Promise.all(profileWrites);
    }

    if (Object.keys(updates).length > 0 || Object.keys(metaUpdates).length > 0) {
      try {
        return await this.getProfile(user.id, accessToken);
      } catch {
        return profile;
      }
    }

    return profile;
  }

  private async isUsernameTaken(username: string): Promise<boolean> {
    const { data, error } = await supabase.rpc('is_username_available', {
      check_username: username,
    });

    if (!error && typeof data === 'boolean') {
      return !data;
    }

    if (supabaseAdmin) {
      const { data: row } = await supabaseAdmin
        .from('users')
        .select('id')
        .eq('username', username)
        .maybeSingle();
      return !!row;
    }

    throw new Error(
      'Could not verify username availability. Set SUPABASE_SERVICE_ROLE_KEY or apply the is_username_available migration.'
    );
  }

  public async getProfile(userId: string, accessToken: string): Promise<AuthUser> {
    const select = 'id, email, name, username, user_type';

    if (supabaseAdmin) {
      const { data: adminData, error: adminError } = await supabaseAdmin
        .from('users')
        .select(select)
        .eq('id', userId)
        .single();

      if (!adminError && adminData) {
        return this.mapProfile(adminData as UserRow);
      }
    }

    const client = getAuthenticatedClient(accessToken);
    const { data, error } = await client.from('users').select(select).eq('id', userId).single();

    if (!error && data) {
      return this.mapProfile(data as UserRow);
    }

    throw new Error('User profile not found');
  }

  public async verifyAccessToken(accessToken: string): Promise<string | null> {
    const { data, error } = await supabase.auth.getUser(accessToken);
    if (error || !data.user) {
      return null;
    }
    return data.user.id;
  }

  public async signup(payload: SignupPayload): Promise<AuthResponse> {
    const { email, password, name, username, phone, userType, acceptedTerms } = payload;

    if (!email || !password || !name || !username) {
      throw new Error('Missing required fields');
    }

    if (!acceptedTerms) {
      throw new Error('You must accept the Terms and Conditions and Privacy Policy');
    }

    if (password.length < 8) {
      throw new Error('Password must be at least 8 characters');
    }

    if (userType !== 'creator' && userType !== 'sponsor') {
      throw new Error('Invalid account type');
    }

    if (await this.isUsernameTaken(username)) {
      throw new Error('Username already taken');
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          username,
          phone,
          user_type: userType,
          terms_accepted_at: new Date().toISOString(),
        },
      },
    });

    if (error) {
      throw new Error(this.mapAuthError(error.message, error.message));
    }

    if (!data.user) {
      throw new Error('Failed to create user');
    }

    if (!data.session) {
      throw new Error(
        'Account created but no session returned. Disable email confirmation in Supabase Dashboard (Authentication → Providers → Email) for local development.'
      );
    }

    let user: AuthUser;
    try {
      user = await this.getProfile(data.user.id, data.session.access_token);
    } catch {
      user = this.mapUserFromMetadata(data.user);
    }

    return {
      user,
      accessToken: data.session.access_token,
      refreshToken: data.session.refresh_token,
    };
  }

  public async login(payload: LoginPayload): Promise<AuthResponse> {
    const { email, password } = payload;

    if (!email || !password) {
      throw new Error('Email and password required');
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.session || !data.user) {
      throw new Error(this.mapAuthError(error?.message ?? '', 'Invalid email or password'));
    }

    let user: AuthUser;
    try {
      user = await this.getProfile(data.user.id, data.session.access_token);
    } catch {
      user = this.mapUserFromMetadata(data.user);
    }

    if (user.id !== data.user.id) {
      user.id = data.user.id;
    }

    return {
      user,
      accessToken: data.session.access_token,
      refreshToken: data.session.refresh_token,
    };
  }

  public async refreshToken(
    refreshToken: string
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const { data, error } = await supabase.auth.refreshSession({
      refresh_token: refreshToken,
    });

    if (error || !data.session) {
      throw new Error('Invalid refresh token');
    }

    return {
      accessToken: data.session.access_token,
      refreshToken: data.session.refresh_token,
    };
  }

  public async logout(refreshToken?: string): Promise<void> {
    if (!refreshToken) {
      return;
    }

    const { data, error } = await supabase.auth.refreshSession({
      refresh_token: refreshToken,
    });

    if (error || !data.session) {
      return;
    }

    await supabase.auth.setSession({
      access_token: data.session.access_token,
      refresh_token: data.session.refresh_token,
    });
    await supabase.auth.signOut({ scope: 'global' });
  }

  public async finishOAuthSession(
    accessToken: string,
    refreshToken: string,
    preferredUserType?: 'creator' | 'sponsor'
  ): Promise<AuthResponse> {
    if (!accessToken || !refreshToken) {
      throw new Error('Missing OAuth session tokens');
    }

    const { data, error } = await supabase.auth.getUser(accessToken);
    if (error || !data.user) {
      throw new Error('Invalid or expired OAuth session');
    }

    const user = await this.ensureOAuthProfile(
      data.user,
      accessToken,
      preferredUserType === 'creator' || preferredUserType === 'sponsor'
        ? preferredUserType
        : undefined
    );

    return {
      user,
      accessToken,
      refreshToken,
    };
  }

  public async deleteAccount(userId: string, email: string, password: string): Promise<void> {
    if (!email?.trim() || !password) {
      throw new Error('Password is required to delete your account');
    }

    if (!supabaseAdmin) {
      throw new Error(
        'Account deletion is temporarily unavailable. Please contact support or try again later.'
      );
    }

    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (signInError || !signInData.user) {
      throw new Error('Incorrect password');
    }

    if (signInData.user.id !== userId) {
      throw new Error('Incorrect password');
    }

    const { error: profileDeleteError } = await supabaseAdmin.from('users').delete().eq('id', userId);

    if (profileDeleteError) {
      console.error('Profile delete error:', profileDeleteError);
      throw new Error(
        'Could not delete account data. Remove active campaigns or pending payouts, then try again.'
      );
    }

    const { error: signOutError } = await supabaseAdmin.auth.admin.signOut(userId, 'global');
    if (signOutError) {
      console.error('Sign out error during account deletion:', signOutError);
    }

    const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(userId);
    if (deleteError) {
      console.error('Auth delete error:', deleteError);
      throw new Error('Failed to delete account. Please try again or contact support.');
    }
  }
}

export default new AuthService();
