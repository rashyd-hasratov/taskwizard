import { User } from '../types/User';

export const users: User[] = [
  {
    id: 1,
    name: 'Andriy Zinchenko',
    email: 'andriy.zinchenko@taskwizard.com',
    created_at: new Date(2022, 9, 10),
  },
  {
    id: 2,
    name: 'Yevhen Koval',
    email: 'yevhen.koval@taskwizard.com',
    created_at: new Date(2023, 1, 14),
  },
  {
    id: 3,
    name: 'Denys Konoval',
    email: 'denys.konoval@taskwizard.com',
    created_at: new Date(2023, 4, 22),
  },
  {
    id: 4,
    name: 'Vladyslav Symoroz',
    email: 'vladyslav.symoroz@taskwizard.com',
    created_at: new Date(2023, 2, 2),
  },
];