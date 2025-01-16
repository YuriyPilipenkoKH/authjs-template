import { LoginClientSchema } from "@/models/schemas";
import { prisma } from "../../prisma/prisma";

export async function signin(formData:FormData) {
  const validationResult = await LoginClientSchema.safeParseAsync({
   
    email: formData.get('email'),
    password: formData.get('password'),
  })
  if(!validationResult.success) {
    return {
      success: false,
      errors: validationResult.error.flatten().fieldErrors,
    }
  }
  try {
    await prisma.$connect()
      // Check if a user already exists with the same email
      const existingUser = await prisma.user.findUnique({
      where: { email: validationResult.data.email  },
    });
  } catch (error) {
    
  }
}