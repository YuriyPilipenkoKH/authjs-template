import { signup } from '@/actions/signup'
import React, { useActionState } from 'react'
// interface SignUpForm Props {

// }


const SignUpForm = () => {
  const [ state, action ] = useActionState(signup,undefined)
  return (
    <form action={action}>
      <input name='name' />
      {state?.errors?.name && <p>{state.errors.name}</p>}
      <input name='email' />
      {state?.errors?.email && <p>{state.errors.email}</p>}
      <input name='password' />
      {state?.errors?.password && <p>{state.errors.password}</p>}
    </form>
  )
}

export default SignUpForm