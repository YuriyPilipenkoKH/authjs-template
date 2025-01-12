'use server'
import { signIn } from "../../auth";

export const githubSignIn = async () => {

  return await signIn("github");
}