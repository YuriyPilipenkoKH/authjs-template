import SignUpForm from '@/components/forms/SignUpForm'
import React from 'react'

const RegisterPage = () => {
  return (
    <div className='p-6 flex flex-col gap-5 items-center justify-center'>
      <h2>Welcome</h2>
      <SignUpForm/>
    </div>
  )
}

export default RegisterPage