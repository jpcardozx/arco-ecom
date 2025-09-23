import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import type { UserRole } from '@/types/next-auth';
import { NextAuthOptions } from 'next-auth';

// Demo users - replace with a real database in production
const users = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@arco.com',
    passwordHash: '$2a$12$dJWDFhhABBPiVRgB6CUzUe0KnM38qhO/l3rxfvk6oIrfnhyvoXxKO', // This is "password123" hashed with bcrypt
    role: 'admin' as UserRole,
  },
  {
    id: '2',
    name: 'Demo User',
    email: 'demo@arco.com',
    passwordHash: '$2a$12$dJWDFhhABBPiVRgB6CUzUe0KnM38qhO/l3rxfvk6oIrfnhyvoXxKO', // This is "password123" hashed with bcrypt
    role: 'user' as UserRole,
  }
];

// Define auth options with proper TypeScript typing
export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'admin@arco.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        
        const user = users.find(u => u.email === credentials.email);
        if (!user) return null;
        
        const isValid = await bcrypt.compare(credentials.password, user.passwordHash);
        if (!isValid) return null;
        
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  callbacks: {
    async jwt({ token, user }: { token: any, user: any }) {
      if (user) {
        token.role = user.role || 'user';
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: { session: any, token: any }) {
      if (session?.user) {
        session.user.role = token.role;
        session.user.id = token.id;
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  debug: process.env.NODE_ENV === 'development',
  secret: process.env.NEXTAUTH_SECRET,
};
