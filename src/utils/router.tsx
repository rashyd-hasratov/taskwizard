import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from 'react-router-dom';

import { HomePage } from '../pages/HomePage/HomePage';
import { AddTaskPage } from '../pages/AddTaskPage/AddTaskPage';
import { TaskPage } from '../pages/TaskPage/TaskPage';
import { UsersPage } from '../pages/UsersPage/UsersPage';
import { AddUserPage } from '../pages/AddUserPage/AddUserPage';
import { StatisticsPage } from '../pages/StatisticsPage/StatiscticsPage';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<HomePage />} />
      <Route path="home" element={<Navigate to="/" replace />} />
      <Route path='add' element={<AddTaskPage />} />
      <Route path='users/add' element={<AddUserPage />} />
      <Route path='users' element={<UsersPage />} />
      <Route path='statistics' element={<StatisticsPage />} />
      <Route path=':id' element={<TaskPage />} />
    </Route>,
  ),
);