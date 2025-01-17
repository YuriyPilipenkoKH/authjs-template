"use server";
import { prisma } from "../../prisma/prisma";


export async function watchRole(formData: FormData) :Promise<void> {
  const email = formData.get("email") as string;
const user = await prisma.user.findUnique({
  where: { email },
  select: { role: true },
});
console.log('role', user?.role);

}
