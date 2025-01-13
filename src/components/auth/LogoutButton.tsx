'use client'
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";


export const LogoutButton = () => {

  const handleLogout = async () => {
    try {
      await signOut({ callbackUrl: "/login" }); // Redirects to the login page after signing out.
      toast.success("Logout successful.");
    } catch (error) {
      console.error("Error during logout:", error);
      toast.error("Failed to log out. Please try again.");
    }
}
  return (
    <button 
      className="btn btn-info logout-btn"
      onClick={handleLogout}  >
        LogOut
    </button>
  );
};