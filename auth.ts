import NextAuth, { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { prisma } from "./prisma/prisma";
import { compare } from "bcrypt-ts";

export const BASE_PATH = "/api/auth";

const authOptions: NextAuthConfig = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        
          const email = credentials.email as string | undefined;
          const password = credentials.password as string | undefined;
          if (!email || !password) {
            throw new Error("Please provide both email and password.");
          }
          await prisma.$connect();
          // Fetch the user from the database
          const user = await prisma.user.findUnique({
            where: { email },
            select: {
              id: true,
              name: true,
              email: true,
              password: true,
              role: true,
            },
          });
      
          if (!user || !user.password) {
            throw new Error("Invalid email or password.");
          }
          // Verify the password
          const isMatched = await compare(password, user?.password);
          if (!isMatched) {
            throw new Error("Password did not match.");
          }
          // Return the user object
          return {
            id: user?.id,
            name: user?.name,
            email: user?.email,
            role: user?.role,
          };
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        // Connect to the database
        await prisma.$connect();
        const email = user?.email ?? undefined;

        if (!email) {
          console.error("User email is missing.");
          return false; // Deny sign-in if email is not valid
        }
        
        // Check if user already exists in the database
        let existingUser = await prisma.user.findUnique({
          where: { email },
        });

        if (!existingUser) {
          // If user does not exist, create a new user
          existingUser = await prisma.user.create({
            data: {
              email: user.email!,
              name: user.name || null,
              image: user.image || null,
              role: "user", // Set the default role to user
            },
          });
        }

        // Check if the account already exists
        if (!account) {
          console.error("Account object is missing.");
          return false; // Exit early if account is null or undefined
        }
        const existingAccount = await prisma.account.findUnique({
          where: {
            provider_providerAccountId: {
              provider: account.provider,
              providerAccountId: account.providerAccountId,
            },
          },
        });

        if (!existingAccount) {
          // If the account does not exist, create it
          await prisma.account.create({
            data: {
              userId: existingUser.id,
              type: account.type,
              provider: account.provider,
              providerAccountId: account.providerAccountId,
              access_token: account.access_token,
              refresh_token: account.refresh_token,
              expires_at: account.expires_at,
              token_type: account.token_type,
              id_token: account.id_token,
              scope: account.scope,
              session_state: account.session_state?.toString() ?? null, // Convert to string or set to null
            },
          });
        }

        return true; // Allow sign-in
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false; // Deny sign-in on error
      }
    },
    async session({ session, token }) {
      // Optionally include additional user data in the session
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string; // Add the role from the token
      }
      return session;
    },
    async jwt({ token, user }) {
      // Add user ID to the JWT token
      if (user) {
        token.id = user.id;
        token.role = user.role; // Add the role to the token
      }
      return token;
    },
  },
  secret: process.env.AUTH_SECRET,
};
export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);


