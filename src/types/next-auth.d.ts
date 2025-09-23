import { DefaultSession, DefaultUser } from 'next-auth';
import { JWT as DefaultJWT } from 'next-auth/jwt';

/**
 * Role-based access control levels for the application
 */
export type UserRole = 'user' | 'admin' | 'manager' | 'client';

/**
 * Extend the built-in session types
 */
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: UserRole;
      emailVerified: string | null;
      provider?: string;
      twoFactorEnabled?: boolean;
    } & DefaultSession['user'];
  }

  interface User extends DefaultUser {
    role: UserRole;
    emailVerified?: string | null;
    twoFactorEnabled?: boolean;
  }
}

/**
 * Extend the JWT type for more secure token handling
 */
declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    id: string;
    role: UserRole;
    provider?: string;
    emailVerified?: string | null;
    twoFactorEnabled?: boolean;
  }
}
