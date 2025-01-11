import React from 'react'
import { auth } from '../../../auth';
import { redirect } from 'next/navigation';

const AnminPage =  async() => {
    const session = await auth();
    if (!session) {
      redirect('/login'); 
    }
  return (
    <div>AnminPage</div>
  )
}

export default AnminPage