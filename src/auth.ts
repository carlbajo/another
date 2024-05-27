import NextAuth from "next-auth";
import authConfig from "./auth.config";
import prisma from "./lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";

export const {
    auth, signIn, signOut, handlers
} = NextAuth({
    ...authConfig,
    adapter: PrismaAdapter(prisma),
    session: {strategy: "jwt"},
    callbacks: {
        async session({token, session}){
            if(!token.sub || !token) return session;
            session.user.id = token.sub;
            return session;
        },
        async jwt({token}){
            return token;
        },
    }
});