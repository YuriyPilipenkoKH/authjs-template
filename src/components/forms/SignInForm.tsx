"use client"
import { LoginClientSchema, LoginClientSchemaType } from '@/models/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'

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