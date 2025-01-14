"use client"
import { signup } from '@/actions/signup'
import React, { useActionState } from 'react'
// interface SignUpForm Props {

// }


const SignUpForm = () => {
  const [ state, action ] = useActionState(signup,undefined)
  return (
    <form action={action}
    className='flex flex-col gap-4 items-center justify-center'>
      <input name='name' placeholder='name' className='input input-primary'/>
      {state?.errors?.name && <p>{state.errors.name}</p>}
      <input name='email' placeholder='mail' className='input input-primary'/>
      {state?.errors?.email && <p>{state.errors.email}</p>}
      <input name='password' placeholder='pass' className='input input-primary'/>
      {state?.errors?.password && <p>{state.errors.password}</p>}
    </form>
  )
}

export default SignUpForm