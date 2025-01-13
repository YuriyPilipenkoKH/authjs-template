'use client'
import { logOut } from "@/actions/auth-actions";
// import toast from "react-hot-toast";

export const LogoutButton = () => {

  const handleLogout = async () => {
     await logOut();
    // if (result?.success) {
      // toast.success("Logout successfull.");
      // router.push('/login')
  // };
}
  return (
    <button 
      className="btn btn-info logout-btn"
      onClick={handleLogout}  >
        LogOut
    </button>
  );
};