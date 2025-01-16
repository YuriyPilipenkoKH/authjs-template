import React from 'react'
import { auth } from '../../../auth';
import { redirect } from 'next/navigation';


const AnminPage =  async() => {
    const session = await auth();
    const userRole = session?.user?.role
    console.log(session);
    
    if (!session) {
      redirect('/login'); 
    }
    if (userRole !== 'admin') {
      redirect('/dashboard'); 
    }
  return (
    <div>AnminPage
      <div>name{' '}{session?.user?.name}</div>
      <div>role{' '}{session?.user?.role}</div>
      <div>photo{' '}{session?.user?.image}</div>

    </div>
  )
}

export default AnminPage