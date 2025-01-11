import React from 'react'
import { auth } from '../../../auth';
import { redirect } from 'next/navigation';

const DashboardPage = async() => {
  const session = await auth();
  if (!session) {
    redirect('/login'); 
  }
  return (
    <div>DashboardPage</div>
  )
}

export default DashboardPage