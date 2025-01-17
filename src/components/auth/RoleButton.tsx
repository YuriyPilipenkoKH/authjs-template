'use client'
import { watchRole } from '@/actions/watch-role'
import { cn } from '@/lib/cn'
import React from 'react';

interface RoleButtonProps { 
  email: string;
}

const RoleButton:React.FC<RoleButtonProps> = ({email}) => {
  const handleCheckRole = async () => {
    const formData = new FormData();
    formData.append("email", email);
    const retrievedRole = await watchRole(formData); // Call server action
  };

  return (
      <button
      onClick={handleCheckRole}
        className={cn("btn btn-info logout-btn ", )}
        >
          role
      </button>
  )
}

export default RoleButton