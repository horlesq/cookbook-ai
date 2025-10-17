import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "./mongodb";
import User from "@/models/User";
import { MongoDBAdapter } from "@auth/mongodb-adapter";

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: MongoDBAdapter(connectDB),
    session: { strategy: "jwt" },
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                name: { label: "Name", type: "text" },
            },
            async authorize(credentials) {
                if (!credentials?.email) {
                    return null;
                }

                await connectDB();

                // Find or create user
                let user = await User.findOne({
                    email: credentials.email.toLowerCase(),
                });

                if (!user) {
                    user = await User.create({
                        email: credentials.email.toLowerCase(),
                        name:
                            credentials.name || credentials.email.split("@")[0],
                    });
                }

                return {
                    id: user._id.toString(),
                    email: user.email,
                    name: user.name,
                };
            },
        }),
    ],
    callbacks: {
        async session({ session, token }) {
            if (session?.user) {
                session.user.id = token.sub;
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
    },
    pages: {
        signIn: "/auth/signin",
    },
});
