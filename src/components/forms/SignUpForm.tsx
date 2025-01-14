"use client"
import { signup } from '@/actions/signup'
import React, { useActionState } from 'react'
// interface SignUpForm Props {

// }


const SignUpForm = () => {
  const [ state, action , pending] = useActionState(signup,undefined)

  return (
    <form action={action}
    className='flex flex-col gap-4 items-center justify-center w-[400px]'>
      <input name='name' placeholder='name' className='input input-primary w-full'/>
      {state?.errors?.name && <p>{state.errors.name}</p>}
      <input name='email' placeholder='mail' className='input input-primary w-full'/>
      {state?.errors?.email && <p>{state.errors.email}</p>}
      <input name='password' placeholder='pass' className='input input-primary w-full'/>
      {state?.errors?.password && <p>{state.errors.password}</p>}
      <button className='btn btn-primary bg-green-900 w-full'>
        {pending ? 'sending' : 'signup'}
      </button>
    </form>
  )
}

export default SignUpForm