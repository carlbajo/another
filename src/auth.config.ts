// AUTH
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
// DATABASE
import { GetUserByEmail } from "./lib/crud";
// Schema
import { SigninSchema } from "./actions/validations/compiled";
// HELPERS
import bcryptjs from "bcryptjs";

export default {providers: [
    Credentials({
        async authorize(credentials){
            const valid = SigninSchema.safeParse(credentials);
            if(valid.success){
                const {email, password} = valid.data;
                const user = await GetUserByEmail(email);
                if(!user || !user.password || !user.email) return null;
                const passwordIsMatch = await bcryptjs.compare(
                    password, user.password
                );
                if(passwordIsMatch) return user;
            }
            return null;
        },
    }),
]} satisfies NextAuthConfig;