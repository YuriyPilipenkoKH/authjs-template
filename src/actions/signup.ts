'use server'

import { RegInputErrorType, RegisterSchema } from "@/models/schemas"

export interface SignupState {
  errors?: RegInputErrorType; // Validation errors, optional
}

export async function signup(
  // state: SignupState| undefined,
  formData:FormData
) {
// console.log('state',state);
  const validationResult = RegisterSchema.safeParse({
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

  const newUser = {
    name: validationResult.data.name,
    email: validationResult.data.email,
    password: validationResult.data.password, // Hash this before storing in production
  };
  
  return { success: true, newUser };
}