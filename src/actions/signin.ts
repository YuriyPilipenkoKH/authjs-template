import { LoginClientSchema } from "@/models/schemas";

export async function signin(formData:FormData) {
  const validationResult = await LoginClientSchema.safeParseAsync({
   
    email: formData.get('email'),
    password: formData.get('password'),
  })
}