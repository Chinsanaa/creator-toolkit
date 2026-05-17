export type UserType = 'creator' | 'sponsor';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  username: string;
  userType: UserType;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  name: string;
  username: string;
  phone?: string;
  userType?: UserType;
}

export interface AuthResponse {
  message: string;
  user: AuthUser;
  accessToken: string;
}

export interface MeResponse {
  userId: string;
  user: AuthUser;
}
