import { Status } from '../../types/Status';
import { Task } from '../../types/Task';

import styles from './Board.module.scss';
import { BoardLine } from '../BoardLine/BoardLine';

type BordProps = {
  tasks: Task[],
};

export const Board = ({ tasks }: BordProps) => {
  const assignedTasks = tasks.filter(({ status}) => status === Status.ASSIGNED);
  const inProgressTasks = tasks.filter(({ status }) => status === Status.IN_PROGRESS);
  const reviewTasks = tasks.filter(({ status }) => status === Status.REVIEW);
  const doneTasks = tasks.filter(({ status}) => status === Status.DONE);

  return (
    <div className={styles.board}>
      <BoardLine title='Assigned' tasks={assignedTasks} />
      <BoardLine title='In Progress' tasks={inProgressTasks} />
      <BoardLine title='Review' tasks={reviewTasks} />
      <BoardLine title='Done' tasks={doneTasks} />
    </div>
  );
}