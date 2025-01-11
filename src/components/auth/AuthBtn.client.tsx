"use client";
import { useSession } from "next-auth/react";

import { logOut, logIn } from "@/actions/auth-actions";

export default function AuthButtonClient() {
  const session = useSession();

  return session?.data?.user ? (
    <button
    className="btn btn-primary"
      onClick={async () => {
        await logOut();
        await logIn();
      }}
    >
       Sign Out
    </button>
  ) : (
    <button onClick={async () => await logIn()}>Sign In</button>
  );
}