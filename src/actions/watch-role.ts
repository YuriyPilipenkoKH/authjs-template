"use server";
import { prisma } from "../../prisma/prisma";


export async function watchRole() {
const user = await prisma.user.findUnique({
  where: { email: "yurik2061@gmail.com" },
  select: { role: true },
});
console.log('user', user);
}
