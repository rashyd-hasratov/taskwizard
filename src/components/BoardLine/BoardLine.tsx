import { Task } from '../../types/Task';
import { TaskCard } from '../TaskCard/TaskCard';

import styles from './BoardLine.module.scss';

type BoardLineProps = {
  title: string,
  tasks: Task[],
};

export const BoardLine = ({
  title,
  tasks,
}: BoardLineProps) => {
  return (
    <div className={styles.boardline}>
      <h2 className={styles.title}>
        {title}
      </h2>

      <div className={styles.tasks}>
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};