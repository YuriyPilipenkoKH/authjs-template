import SignUpForm from '@/components/forms/SignUpForm'
import React from 'react'
import { auth } from '../../../../auth';
import { redirect } from 'next/navigation';

const RegisterPage = async() => {
      const session = await auth()
        if (session) {
          redirect('/dashboard'); 
        }
  return (
    <div className='p-6 flex flex-col gap-5 items-center justify-center'>
      <h2>Welcome</h2>
      <SignUpForm/>
    </div>
  )
}

export default RegisterPage