"use client"
import { signup } from '@/actions/signup'
import { RegInput, RegisterSchema } from '@/models/schemas'
import React, { useActionState } from 'react'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';


const SignUpForm = () => {
  const {
    register, 
    handleSubmit,
    formState,
    reset,
  } = useForm<RegInput>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
      mode:'all',
      resolver: zodResolver(RegisterSchema),
  })
  const {
    errors,
    isDirty,
    isValid ,
    isSubmitting,
  } = formState

  const onSubmit= async (data:RegInput) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("password", data.password);

      const result = await signup(formData);

      if (result) {
        toast.success("Registration successful");
      } else if (!result) {
        toast.error("Validation errors occurred");
      }
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error("Registration failed");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} 
    className='flex flex-col gap-4 items-center justify-center w-[400px]'>
      <input
        {...register("name")}
        placeholder="Name"
        className="input input-primary w-full"
      />
      {errors.name && <p className="text-red-500">{errors.name.message}</p>}

      <input
        {...register("email")}
        placeholder="Email"
        className="input input-primary w-full"
      />
      {errors.email && <p className="text-red-500">{errors.email.message}</p>}

      <input
        {...register("password")}
        // type="password"
        placeholder="Password"
        className="input input-primary w-full"
      />
      {errors.password && <p className="text-red-500">{errors.password.message}</p>}

      <button
        type="submit"
        className="btn btn-primary bg-green-900 w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sending..." : "Sign Up"}
      </button>
    </form>
  )
}

export default SignUpForm