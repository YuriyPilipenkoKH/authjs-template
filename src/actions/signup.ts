'use server'

import { RegInputErrorType, RegisterSchema } from "@/models/schemas"
import {hashSync} from 'bcrypt-ts'
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
  const hashedPassword =  hashSync(validationResult.data.password)
  const newUser = {
    name: validationResult.data.name,
    email: validationResult.data.email,
    password: hashedPassword, // Hash this before storing in production
  };

  return { success: true, newUser };
}