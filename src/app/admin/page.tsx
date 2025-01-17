import React from 'react'
import { auth } from '../../../auth';
import { redirect } from 'next/navigation';
import { watchRole } from '@/actions/watch-role';
import Link from 'next/link';


const AnminPage =  async() => {
    const session = await auth();
    if (!session) redirect('/login'); 

    const email = session?.user?.email;
    if (!email) redirect('/dashboard');

    const formData = new FormData();
    formData.append("email", email);

    const userRole = await watchRole(formData); // Call server action
    if (userRole !== 'admin') redirect('/dashboard'); 
  return (
    <div className='flex flex-col gap-2 items-center justify-center'>
      <h1>AnminPage</h1>
      <Link href={'/dashboard'}>dashboard Page</Link>
      <div>name{' '}{session?.user?.name}</div>
      <div>role{' '}{userRole}</div>
      <div>photo{' '}{session?.user?.image}</div>

    </div>
  )
}

export default AnminPage