import { Link } from 'react-router-dom';
import classnames from 'classnames';

import { Task } from '../../types/Task';
import { statusColors } from '../../constants';

import styles from './TaskCard.module.scss';
import { Status } from '../../types/Status';

type TaskCardProps = {
  task: Task,
};

export const TaskCard = ({ task }: TaskCardProps) => {
  const {
    id,
    title,
    description,
    status,
    deadline,
  } = task;

  const deadlineDate = deadline.getDate() < 10
    ? `0${deadline.getDate()}`
    : `${deadline.getDate()}`;

  const deadlineMonth = deadline.getMonth() < 9
    ? `0${deadline.getMonth() + 1}`
    : `${deadline.getMonth() + 1}`;

  const deadlineYear = `${deadline.getFullYear()}`; 

  const deadlineFormatted = `${deadlineDate}.${deadlineMonth}.${deadlineYear}`;

  const isExpired = new Date().getTime() > deadline.getTime()
    && task.status !== Status.DONE;

  const statusIconStyles = {
    backgroundColor: statusColors[status],
  };

  const statusTitleStyles = {
    color: statusColors[status],
  };

  return (
    <div className={styles.card}>
      <div className={styles.main}>
        <h2 className={styles.title}>
          {title}
        </h2>

        <p className={styles.description}>
          {description}
        </p>
      </div>

      <div className={styles.additional}>
        <div className={styles.info}>
          <div className={styles.status}>
            <div
              className={styles.status_icon_container}
              style={statusIconStyles}
            ></div>

            <p
              className={styles.status_title}
              style={statusTitleStyles}
            >
              {status}
            </p>
          </div>

          <div className={styles.deadline}>
            <div
              className={classnames(
                styles.deadline_icon_container,
                { [styles.deadline_icon_container_danger]: isExpired },
              )}
            ></div>

            <p className={classnames(
              styles.deadline_title,
              { [styles.deadline_title_danger]: isExpired },
            )}>
              {deadlineFormatted}
            </p>
          </div>
        </div>

        <Link
          to={`/${id}`}
          className={styles.details_link}
        >
          See details
        </Link>
      </div>
    </div>
  );
};