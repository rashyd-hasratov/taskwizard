import { Task } from '../../types/Task';
import { TaskCard } from '../TaskCard/TaskCard';

import styles from './TaskList.module.scss';

type TaskListProps = {
  tasks: Task[],
};

export const TaskList = ({ tasks }: TaskListProps) => {
  return (
    <div className={styles.list}>
      {tasks.map(task => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div> 
  );
};
