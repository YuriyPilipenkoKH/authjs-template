import { watchRole } from '@/actions/watch-role'
import { cn } from '@/lib/cn'
import React from 'react'

const RoleButton = () => {
  return (
          <form action={watchRole} >
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