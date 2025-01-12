import React from 'react'
import { auth } from '../../../auth';
import { redirect } from 'next/navigation';
import { LogoutButton } from '@/components/auth/LogoutButton';


const DashboardPage = async() => {
  const session = await auth();
  if (!session) {
    redirect('/login'); 
  }
  return (
    <div>
      <h1>DashboardPage</h1>
      <div>{session?.user?.name}</div>
      <div>{session?.user?.image}</div>
      <LogoutButton/>
    </div>
  )
}

export default DashboardPage