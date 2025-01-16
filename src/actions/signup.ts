'use server'

import { RegInputErrorType, RegisterSchema } from "@/models/schemas"
import {hashSync} from 'bcrypt-ts'
import { prisma } from "../../prisma/prisma";
import { revalidatePath } from "next/cache";
export interface SignupState {
  errors?: RegInputErrorType; // Validation errors, optional
}

export async function signup(
  // state: SignupState| undefined,
  formData:FormData
) {
// console.log('state',state);
  const validationResult = await RegisterSchema.safeParseAsync({
    name: formData.get('name'),
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
  
    if (existingUser) {
      return { success: false, error: "Email is already registered." };
    }
    
    const hashedPassword =  hashSync(validationResult.data.password)
    const newUser = await prisma.user.create({
      data: {
        name: validationResult.data.name,
        email: validationResult.data.email,
        password: hashedPassword, 
      },
    });
 
    // Exclude sensitive fields
    const { password: _, ...plainUser } = newUser;
    revalidatePath('/dashboard');
    return { 
      success: true, 
      message: `${newUser.name}  registered and logged in successfully.`, 
      user: plainUser
    };
  } catch (error) {
    console.error('Error occurred while registering:', error);
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
    return { success: false, error: errorMessage }
  }
}