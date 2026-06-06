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
      name: (meta.name as string) ?? '',
      username: (meta.username as string) ?? '',
      userType: this.normalizeUserType(meta.user_type as string | undefined),
    };
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

  public async logout(): Promise<void> {
    await supabase.auth.signOut();
  }
}

export default new AuthService();
