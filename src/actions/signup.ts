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
      errors: validationResult.error.flatten().fieldErrors
    }
  }
}