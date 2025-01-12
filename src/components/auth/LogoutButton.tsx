'use client'
import { logOut } from "@/actions/auth-actions";
// import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const LogoutButton = () => {
  // const router = useRouter()
  const handleLogout = async () => {
    const result =  await logOut();
    // if (result?.success) {
      // toast.success("Logout successfull.");
      // router.push('/login')
  // };
}
  return (
    <button 
      className="btn btn-primary logout-btn"
      onClick={handleLogout}  >
        LogOut
    </button>
  );
};