import { logOut } from "@/actions/auth-actions";

export const LogoutButton = () => {
  const handleLogout = async () => {
    const result =  await logOut();
    if (result?.success) {
      // toast.success(
      //   result?.message
      // );
  };
}
  return (
    <button 
      className="btn btn-primary logout-btn"
      onClick={handleLogout}  >
        LogOut
    </button>
  );
};