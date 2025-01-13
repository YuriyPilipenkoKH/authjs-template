"use server";
import { signIn,} from "../../auth";
import { signOut } from 'next-auth/react';

export async function logIn() {
  await signIn();
}

export const logOut = async () => {
     await signOut({ callbackUrl: "/login" })
}

// await signOut({redirectTo: '/login'}); 