
import React from 'react'
import { auth } from '../../../../auth';
import AuthButton from '@/components/auth/AuthBtn.server';
import { redirect } from 'next/navigation';

const LoginPage = async() => {
    const session = await auth()
    console.log(session);
      if (session) {
        redirect('/dashboard'); 
      }
    
  return (
    <div>
      <AuthButton/>
    </div>
  )
}

export default LoginPage