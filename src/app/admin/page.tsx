import React from 'react'
import { auth } from '../../../auth';
import { redirect } from 'next/navigation';
import AuthButton from '@/components/auth/AuthBtn.server';

const AnminPage =  async() => {
    const session = await auth();
    const userRole = session?.user?.role
    console.log('userRole',userRole);
    
    if (!session) {
      redirect('/login'); 
    }
    if (userRole !== 'admin') {
      redirect('/dashboard'); 
    }
  return (
    <div>AnminPage
      <AuthButton/>
    </div>
  )
}

export default AnminPage