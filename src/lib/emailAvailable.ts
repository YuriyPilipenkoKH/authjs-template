
import { prisma } from "../../prisma/prisma";

export const emailAvailable = async (fieldValue: string): Promise<string | undefined> => {

  try {
     await prisma.$connect()
      // Check if a user already exists with the same email
      const existingUser = await prisma.user.findFirst({
      where: { email: fieldValue  },
    });
 console.log('existingUser', existingUser);
      return existingUser ? 'Email already exists' : undefined;

  } catch (error) {
      console.error('Error checking email availability:', error);
  }
};