import { User } from '@prisma/client';

export interface Userdetails {
  details: Pick<User, "image" | "name" | "role" >
}