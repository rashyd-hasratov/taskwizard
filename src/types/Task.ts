import { Status } from './Status';

export type Task = {
  id: number,
  title: string,
  description: string,
  status: Status,
  deadline: Date,
  created_at: Date,
  userId: number,
};