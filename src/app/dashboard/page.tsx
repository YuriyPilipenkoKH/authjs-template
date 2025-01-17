import React from 'react'
import { auth } from '../../../auth';
import { redirect } from 'next/navigation';
import { LogoutButton } from '@/components/auth/LogoutButton';
import RoleButton from '@/components/auth/RoleButton';
import { watchRole } from '@/actions/watch-role';
import Link from 'next/link';


const DashboardPage = async() => {
  const session = await auth();
  console.log(session);
    if (!session) redirect('/login'); 
    const email = session?.user?.email;
    if (!email) redirect('/dashboard');

    const formData = new FormData();
    formData.append("email", email);
     const userRole = await watchRole(formData)

  return (
    <div className='flex flex-col gap-2 items-center justify-center'>
      <h1>DashboardPage</h1>
      {userRole === 'admin' && <Link href={'/admin'}>Admin Page</Link>}
      <div>name{' '}{session?.user?.name}</div>
      <div>role{' '}{userRole}</div>
      <div>photo{' '}{session?.user?.image}</div>
     
      <LogoutButton username={session?.user?.name}/>
      <RoleButton email={session?.user?.email}/>

    </div>
  )
}

export default DashboardPage