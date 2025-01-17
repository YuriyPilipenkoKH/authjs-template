import { watchRole } from '@/actions/watch-role'
import { cn } from '@/lib/cn'
import React from 'react';

interface RoleButtonProps { 
  email: string;
}

const RoleButton:React.FC<RoleButtonProps> = ({email}) => {
  return (
    <form action={watchRole} >
      <input type="hidden" name="email" value={email} />
      <button
        className={cn("btn btn-info logout-btn ", )}
        // onClick={handleLogout}  
        >
          role
      </button>
    </form>
  )
}

export default RoleButton