'use client'
import { cn } from "@/lib/cn";
import { signOut } from "next-auth/react";
import { useFormStatus } from "react-dom";
import toast from "react-hot-toast";


export const LogoutButton = () => {
 const {pending,} = useFormStatus()
 
  const handleLogout = async () => {
    try {
      await signOut({ callbackUrl: "/login" }); // Redirects to the login page after signing out.
      toast.success("Logout successful,");
    } catch (error) {
      console.error("Error during logout:", error);
      toast.error("Failed to log out. Please try again.");
    }
}
  return (
   
      <form action={handleLogout} >
        <button
          className={cn("btn btn-info logout-btn ", )}
          // onClick={handleLogout}  
          >
            {pending ? 'process' : 'LogOut'}
        </button>
      </form>

  );
};