
import React from 'react'
import { auth } from '../../../../auth';
import { redirect } from 'next/navigation';
import SignInButton from '@/components/auth/SignInButton';

const LoginPage = async() => {
    const session = await auth()
    console.log(session);
      if (session) {
        redirect('/dashboard'); 
      }
    
  return (
    <div className='flex flex-col gap-5 items-center justify-center p-5'  >
      <SignInButton provider='google' />
      <SignInButton provider='github' />
    </div>
  )
}

export default LoginPage