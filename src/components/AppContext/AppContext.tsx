import React, { useMemo, useState } from 'react';

import { tasks as tasksFromDB } from '../../db/tasks';
import { users as usersFromDB } from '../../db/users';
import { Task } from '../../types/Task';
import { User } from '../../types/User';

interface IContextValue {
  tasks: Task[],
  users: User[],
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>,
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

export const AppContext = React.createContext<IContextValue>({
  tasks: [],
  users: [],
  setTasks: () => {},
  setUsers: () => {},
});

type AppContextProps = {
  children: React.ReactNode,
};

export const AppProvider = ({ children }: AppContextProps) => {
  const [tasks, setTasks] = useState<Task[]>(tasksFromDB);
  const [users, setUsers] = useState<User[]>(usersFromDB);

  const contextValue = useMemo(() => {
    return {
      tasks,
      users,
      setTasks,
      setUsers
    };
  }, [tasks, users]);

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};