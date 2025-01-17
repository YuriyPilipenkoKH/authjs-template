'use client'
import { watchRole } from '@/actions/watch-role'
import { cn } from '@/lib/cn'
import React, { useState } from 'react';

interface RoleButtonProps { 
  email: string;
}

const RoleButton:React.FC<RoleButtonProps> = ({email}) => {
  const [role, setRole] = useState<string | undefined>(undefined)

  const formData = new FormData();
  formData.append("email", email);

  const handleCheckRole = async () => {
    const retrievedRole = await watchRole(formData); // Call server action
    setRole(retrievedRole)
  };

  return (
      <button
      onClick={handleCheckRole}
        className={cn("btn btn-info logout-btn ", )}
        >
          role{' '}{role}
      </button>
  )
}

export default RoleButton