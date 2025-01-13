import { User } from '@prisma/client';
import { z } from 'zod';

export interface Userdetails {
  details: Pick<User, "image" | "name" | "role" >
}

export const taskStatusSchema = z.enum(['todo', 'inprogress', 'done']);
export type TaskStatus = z.infer<typeof taskStatusSchema>;

export type TaskSummary = Record<TaskStatus, Record<number, { count: number; name: string }>>;



// Record<K, V>:
// A TypeScript utility type that creates an object type with keys of type K and values of type V.