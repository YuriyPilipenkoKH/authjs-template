import React from 'react'
import { auth } from '../../../auth';
import { redirect } from 'next/navigation';
import { LogoutButton } from '@/components/auth/LogoutButton';
import RoleButton from '@/components/auth/RoleButton';


const DashboardPage = async() => {
  const session = await auth();
  console.log(session);
  if (!session) {
    redirect('/login'); 
  }
  return (
    <div className='flex flex-col gap-2 items-center justify-center'>
      <h1>DashboardPage</h1>
      <div>{session?.user?.name}</div>
      <div>{session?.user?.role}</div>
      <div>{session?.user?.image}</div>
     
      <LogoutButton/>
      <RoleButton/>

    </div>
  )
}

export default DashboardPage