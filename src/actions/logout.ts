
import { signOut } from 'next-auth/react';

export const logOut = async () => {
  try {
    await signOut({ callbackUrl: '/login' }); // Перенаправление после выхода
      return { 
        success: true, 
        message: "Logout successfull.", 
      }
  } catch (error) {
    console.error('Error during logout:', error);
  }
};
