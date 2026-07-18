import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';
import type { NextAuthConfig } from 'next-auth';
import { prisma } from './lib/prisma';
import { compareSync } from 'bcryptjs';
export const config = {
    pages: {
        signIn: '/sign-in',
        error: '/sign-in',
    },
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60,
        updateAge: 24 * 60 * 60,
    },
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            credentials: {
                email: { type: 'email' },
                password: { type: "password" }
            },
            async authorize(credentials) {
                if (credentials === null) return null;

                const user = await prisma.user.findFirst({
                    where: { email: credentials.email as string }
                })
                if (user && user.password) {
                    const isMatch = compareSync(credentials.password as string, user.password)
                    if (isMatch) {
                        return {
                            id: user.id,
                            name: user.name,
                            email: user.email,
                            role: user.role
                        }
                    }
                }
                return null
            }
        })
    ],
    callbacks: {
        async session({ session, user, trigger, token }: any) {
            session.user.id = token.sub
            session.user.role = token.role
            if (trigger === 'update') {
                session.user.name = user.name;
            }
            return session
        },
        async jwt({ token, user, trigger, session }: any) {
            if (user) {
                token.role = user.role
            }
            return token
        }
    }
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(config)
