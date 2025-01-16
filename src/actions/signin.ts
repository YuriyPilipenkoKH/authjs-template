import { LoginClientSchema } from "@/models/schemas";
import { prisma } from "../../prisma/prisma";
import { compare } from "bcrypt-ts";

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
    if (!existingUser?.password) {
      return { success: false, error: "Email is not registered." };
    }
    // Verify the password
    const isMatched = await compare(validationResult.data.password, existingUser.password);

    if (!isMatched) {
      return { success: false, error: "Password did not match." };
    }
    // Exclude sensitive fields
    

  } catch (error) {
    
  }
}