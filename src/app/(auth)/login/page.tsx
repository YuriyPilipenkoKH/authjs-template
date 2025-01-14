
import React from 'react'
import { auth } from '../../../../auth';
import { redirect } from 'next/navigation';
import SignInButton from '@/components/auth/SignInButton';
import SignInForm from '@/components/forms/SignInForm';

const LoginPage = async() => {
    const session = await auth()
    console.log(session);
      if (session) {
        redirect('/dashboard'); 
      }
    
  return (
    <div className='flex flex-col gap-5 items-center justify-center   p-6'  >
      <div className='flex flex-col gap-5 w-[400px]'>
        <SignInButton provider='google' />
        <SignInButton provider='github' />
      </div>

      <SignInForm/>
    </div>
  )
}

export default LoginPage