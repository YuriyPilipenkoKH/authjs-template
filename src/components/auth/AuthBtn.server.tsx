import { SessionProvider } from "next-auth/react";

import AuthButtonClient from "./AuthBtn.client";
import { auth, BASE_PATH } from "../../../auth";



export default async function AuthButton() {
  const session = await auth();


  return (
    <SessionProvider basePath={BASE_PATH} session={session}>
      <AuthButtonClient />
    </SessionProvider>
  );
}