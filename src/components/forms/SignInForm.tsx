"use client"
import { signin } from '@/actions/signin'
import { signIn } from 'next-auth/react'
import capitalize from '@/lib/capitalize'
import { LoginClientSchema, LoginClientSchemaType } from '@/models/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'


const SignInForm = () => {
    const router = useRouter()
    const {
      register, 
      handleSubmit,
      formState,
      reset,
      setError, // Use this to manually set server-side errors
    } = useForm<LoginClientSchemaType>({
      defaultValues: {
        email: '',
        password: '',
      },
        mode:'all',
        resolver: zodResolver(LoginClientSchema),
    })
    const {
      errors,
      isDirty,
      isValid ,
      isSubmitting,
    } = formState

    const onSubmit= async (data:LoginClientSchemaType) => {
      const formData = new FormData();

      formData.append("email", data.email);
      formData.append("password", data.password);
  
      const nextAuthSignIn = async (userName: string) => {
        // Use `signIn` client-side to complete authentication
        const signInResponse = await signIn("credentials", {
         redirect: false,
         email: data.email,
         password: data.password,
         callbackUrl: "/dashboard",
       });
       if (signInResponse?.error) {
         console.error("SignIn error:", signInResponse.error);
         return;
       }
       if (signInResponse?.ok){
         toast.success( 
           `${capitalize(userName)}, your registration was successful! `  
          );
       } 
       }
      try {
  
        const result = await signin(formData);
  
        if (result?.success && result?.user?.name) {
          toast.success("Registration successful");
          // await nextAuthSignIn(result?.user?.name)
          reset()
          // router.push('/dashboard');
        } 
        else if (result?.errors) {
        // Map server errors to react-hook-form errors
        for (const [field, messages] of Object.entries(result.errors)) {
          setError(field as keyof LoginClientSchemaType, {
            type: "server",
            message: messages[0], // Use the first error message for simplicity
          });
        }
          
        }
      } catch (error) {
        console.error("Registration failed:", error);
        toast.error("Registration failed");
      }
    };
  return (
    <form  className='flex flex-col gap-4 items-center justify-center w-[400px]'>
      <label  className='w-full'>
        <input
          placeholder="mail"
          className="input input-primary w-full"
        />
      </label>
      <label  className='w-full'>
        <input
          placeholder="pass"
          className="input input-primary w-full"
        />
      </label>
        <button
          type="submit"
          className="btn btn-primary bg-green-900 w-full" >
          Log In
        </button>
    </form>
  )
}

export default SignInForm