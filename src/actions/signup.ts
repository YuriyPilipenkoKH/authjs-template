'use server'

import { RegisterSchema } from "@/models/schemas"


export async function signup(state:unknown, formData:FormData) {

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