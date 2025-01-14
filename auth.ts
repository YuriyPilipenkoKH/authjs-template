import NextAuth, { Account, NextAuthConfig, Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { prisma } from "./prisma/prisma";
import { compare } from "bcrypt-ts";
import { JWT } from "next-auth/jwt";
// import { PrismaAdapter } from "@auth/prisma-adapter";


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
        try {
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
        } catch (error) {
          console.error("Error in authorize function:", error);
          return null;
        }
      },
      
    }),
  ],
  // adapter: PrismaAdapter(prisma),
  // session: { strategy: "jwt" },
  // basePath: BASE_PATH,
 
  pages: {
    signIn: "/login", // When the user visits a protected route without being logged in, they will be redirected to /login
    signOut: "/login", // The page where the user will be redirected after logging out
  },
  callbacks: {
    async session({ session, token }: { session: Session; token: JWT }) {
      try {
        if (session.user) {
          if (token?.id) {
            session.user.id = token.id as string;
          }
          if (token?.role) {
            session.user.role = token.role as string;
          }
        }
        return session;
      } catch (error) {
        console.error("Error in session callback:", error);
        // Optionally, return the session as-is or null in case of an error
        return session;
      }
    }
    ,
    async jwt({ token, user }: { token: JWT; user?: User }) {
      try {
        if (user) {
          token.id = user.id as string;
          token.role = user.role as string;
        }
        return token;
      } catch (error) {
        console.error("Error in JWT callback:", error);
        // Optionally, handle the error or modify the token to reflect an issue
        return token; // Ensure the token is returned even in case of an error
      }
    }
    ,
    async signIn({
      user,
      account,
    }: {
      user: User; // Use the Prisma User type here
      account: Account | null;
    }){
      if (account?.provider === "google") {
      //   try {

          if (!user.email) {
            console.error("Missing email in user data");
            return false;
          }

      //     // Check if the user already exists in the database
      //     const existingUser = await prisma.user.findUnique({
      //       where: { email: user.email },
      //     });

      //     if (!existingUser) {
      //       console.error("user not found");
      //       return false;

      //     }
      //   } catch (error) {
      //     console.error("Error while creating user:", error);
      //     return false;
      //   }
      return true;
      }
      return true;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);


