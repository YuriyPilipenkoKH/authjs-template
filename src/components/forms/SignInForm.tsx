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
import { ImSpinner9 } from 'react-icons/im'


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
           `${capitalize(userName)}, you're successfully logged in! `  
          );
       } 
       }
      try {
          const result = await signin(formData);
  
        if (result?.success && result?.user?.name) {
          await nextAuthSignIn(result?.user?.name)
          // toast.success(result?.message);
          reset()
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
    <form 
      onSubmit={handleSubmit(onSubmit) } 
      autoComplete="off"
      noValidate
      className='flex flex-col gap-4 items-center justify-center w-[400px]'>
      <label  className='w-full'>
      <input
          {...register("email")}
          placeholder="Email"
          className="input input-primary w-full"
        />
        {errors.email && <p className="text-purple-900">{errors.email.message}</p>}
      </label>
      <label  className='w-full'>
      <input
          {...register("password")}
          // type="password"
          placeholder="Password"
          className="input input-primary w-full"
        />
        {errors.password && <p className="text-purple-900">{errors.password.message}</p>}
      </label>
      <button
        type="submit"
        className="btn btn-primary bg-green-900 w-full"
        disabled={isSubmitting || !isValid || !isDirty}  >
        {isSubmitting ? <ImSpinner9 className='animate-spin'/> : null}
        {isSubmitting ? "Sending..." : "LogIn"}
      </button>
    </form>
  )
}

export default SignInForm