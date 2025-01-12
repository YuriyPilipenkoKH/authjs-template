'use server'
import { signIn } from "../../auth";

export const googleSignIn = async () => {

  return await signIn("google");
}