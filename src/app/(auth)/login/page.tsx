
import React from 'react'
import { auth } from '../../../../auth';
import AuthButton from '@/components/auth/AuthBtn.server';

const LoginPage = async() => {
    const session = await auth()
    console.log(session);
    
  return (
    <div>
      <AuthButton/>
    </div>
  )
}

export default LoginPage