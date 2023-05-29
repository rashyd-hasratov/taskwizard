import { Task } from '../types/Task';
import { Status } from '../types/Status';

export const tasks: Task[] = [
  {
    id: 1,
    title: 'Setup the database',
    description: 'Setup the database using Railway platform',
    status: Status.DONE,
    deadline: new Date(2023, 4, 27),
    created_at: new Date(2023, 4, 25),
    userId: 2,
  },
  {
    id: 2,
    title: 'Setup the backend',
    description: 'Setup the API using Railway platform.',
    status: Status.IN_PROGRESS,
    deadline: new Date(2023, 5, 1),
    created_at: new Date(2023, 4, 25),
    userId: 2,
  },
  {
    id: 3,
    title: 'Setup the frontend',
    description: 'Setup the frontend using Railway platform.',
    status: Status.ASSIGNED,
    deadline: new Date(2023, 5, 5),
    created_at: new Date(2023, 4, 28),
    userId: 1,
  },
  {
    id: 4,
    title: 'Write readme file for API',
    description: 'Add the API docs to repository\'s README.MD.',
    status: Status.IN_PROGRESS,
    deadline: new Date(2023, 5, 2),
    created_at: new Date(2023, 4, 26),
    userId: 3,
  },
  {
    id: 5,
    title: 'Write readme file for Frontend',
    description: 'Add the setup guide to repository\'s README.MD.',
    status: Status.ASSIGNED,
    deadline: new Date(2023, 5, 3),
    created_at: new Date(2023, 4, 26),
    userId: 3,
  },
  {
    id: 6,
    title: 'Prepare the schedule',
    description: 'Prepare the schedule for the next project',
    status: Status.REVIEW,
    deadline: new Date(2023, 4, 5),
    created_at: new Date(2023, 4, 1),
    userId: 4,
  },
];