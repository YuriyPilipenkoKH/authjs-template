"use client"
import { signup } from '@/actions/signup'
import {  RegisterClientSchema, RegisterClientSchemaType } from '@/models/schemas'
import React from 'react'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ImSpinner9 } from "react-icons/im";
import { signIn } from 'next-auth/react'
import capitalize from '@/lib/capitalize'
import { useRouter } from 'next/navigation'


const SignUpForm = () => {
 const router = useRouter()
  const {
    register, 
    handleSubmit,
    formState,
    reset,
    setError, // Use this to manually set server-side errors
  } = useForm<RegisterClientSchemaType>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
      mode:'all',
      resolver: zodResolver(RegisterClientSchema),
  })
  const {
    errors,
    isDirty,
    isValid ,
    isSubmitting,
  } = formState

  const onSubmit= async (data:RegisterClientSchemaType) => {
    const formData = new FormData();
    formData.append("name", data.name);
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

      const result = await signup(formData);

      if (result?.success && result?.user?.name) {
        toast.success("Registration successful");
        await nextAuthSignIn(result?.user?.name)
        reset()
        router.push('/dashboard')
      } 
      else if (result?.errors) {
      // Map server errors to react-hook-form errors
      for (const [field, messages] of Object.entries(result.errors)) {
        setError(field as keyof RegisterClientSchemaType, {
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
    <form onSubmit={handleSubmit(onSubmit) } 
    autoComplete="off"
    noValidate
    className='flex flex-col gap-4 items-center justify-center w-[400px]'>
      <label  className='w-full'>
        <input
          {...register("name")}
          placeholder="Name"
          className="input input-primary w-full"
        />
        {errors.name && <p className="text-purple-900">{errors.name.message}</p>}
      </label>

      <label  className='w-full'>
        <input
          {...register("email")}
          placeholder="Email"
          className="input input-primary w-full"
        />
        {errors.email && <p className="text-purple-900">{errors.email.message}</p>}
      </label>

      <label className='w-full'>
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
        disabled={isSubmitting || !isValid || !isDirty} >
        {isSubmitting ? <ImSpinner9 className='animate-spin'/> : null}
        {isSubmitting ? "Sending..." : "Sign Up"}
      </button>
    </form>
  )
}

export default SignUpForm