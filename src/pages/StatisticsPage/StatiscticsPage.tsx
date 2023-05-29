import { useContext, useMemo } from 'react';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';

import { AppContext } from '../../components/AppContext';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';

import styles from './StatisticsPage.module.scss';
import commonStyles from '../../styles/Common.module.scss';
import { Status } from '../../types/Status';
import { UserStatisticsCard } from '../../components/UserStatisticsCard/UserStatisticsCard';

const formatStringDateToDate = (stringDate: string) => {
  const dateSplit = stringDate
    .split('-')
    .map (part => Number(part));

  const date = new Date(dateSplit[0], dateSplit[1] - 1, dateSplit[2]);

  return date;
};

export const StatisticsPage = () => {
  const { users, tasks } = useContext(AppContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const taskAddedFromParam = searchParams.get('task-added-from');
  const taskAddedToParam = searchParams.get('task-added-to');
  const taskDeadlineFromParam = searchParams.get('task-deadline-from');
  const taskDeadlineToParam = searchParams.get('task-deadline-to');

  const isClearButtonActive = taskAddedFromParam
    || taskAddedToParam
    || taskDeadlineFromParam
    || taskDeadlineToParam;

  let visibleTasks = useMemo(() => {
    let filteredTasks = tasks;
  
    if (taskAddedFromParam) {
      const addedFromDate = formatStringDateToDate(taskAddedFromParam);
  
      filteredTasks = filteredTasks.filter(({ created_at }) => (
        created_at.getTime() >= addedFromDate.getTime()
      ));
    }
  
    if (taskAddedToParam) {
      const addedToDate = formatStringDateToDate(taskAddedToParam);
  
      filteredTasks = filteredTasks.filter(({ created_at }) => (
        created_at.getTime() <= addedToDate.getTime()
      ));
    }
  
    if (taskDeadlineFromParam) {
      const deadlineFromDate = formatStringDateToDate(taskDeadlineFromParam);
  
      filteredTasks = filteredTasks.filter(({ deadline }) => (
        deadline.getTime() >= deadlineFromDate.getTime()
      ));
    }
  
    if (taskDeadlineToParam) {
      const deadlineToDate = formatStringDateToDate(taskDeadlineToParam);
  
      filteredTasks = filteredTasks.filter(({ deadline }) => (
        deadline.getTime() <= deadlineToDate.getTime()
      ));
    }
  
    return filteredTasks;
  }, [
    taskAddedFromParam,
    taskAddedToParam,
    taskDeadlineFromParam,
    taskDeadlineToParam,
    tasks,
  ]);

  let visibleUsers = useMemo(() => {
    let sortedUsers = [...users];

    sortedUsers.sort((userA, userB) => {
      const userADoneTasksCount = visibleTasks.reduce((sum, task) => (
        task.status === Status.DONE && task.userId === userA.id
          ? sum + 1
          : sum
      ), 0);

      const userBDoneTasksCount = visibleTasks.reduce((sum, task) => (
        task.status === Status.DONE && task.userId === userB.id
          ? sum + 1
          : sum
      ), 0);

      return userBDoneTasksCount - userADoneTasksCount;
    });

    return sortedUsers;
  }, [
    visibleTasks,
    users,
  ]);

  const handleFiltersClear = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    searchParams.delete('task-added-from');
    searchParams.delete('task-added-to');
    searchParams.delete('task-deadline-from');
    searchParams.delete('task-deadline-to');

    setSearchParams(searchParams);
  };

  return (
    <div className={commonStyles.page}>
      <Header />

      <main className={commonStyles.main}>
        <div className={commonStyles.container}>
          <div className={commonStyles.main_content}>
            <div className={commonStyles.main_header}>
              <h1 className={commonStyles.page_title}>Statistics</h1>
            </div>

            <div className={styles.filters}>
              <div className={styles.filter}>
                Task added from
                <input
                  type='date'
                  className={styles.filterDateInput}
                  value={String(taskAddedFromParam)}
                  onChange={(event) => {
                    searchParams.set('task-added-from', event.target.value);
                    setSearchParams(searchParams);
                  }}
                />
              </div>

              <div className={styles.filter}>
                Task added to
                <input
                  type='date'
                  className={styles.filterDateInput}
                  value={String(taskAddedToParam)}
                  onChange={(event) => {
                    searchParams.set('task-added-to', event.target.value);
                    setSearchParams(searchParams);
                  }}
                />
              </div>

              <div className={styles.filter}>
                Task deadline from
                <input
                  type='date'
                  className={styles.filterDateInput}
                  value={String(taskDeadlineFromParam)}
                  onChange={(event) => {
                    searchParams.set('task-deadline-from', event.target.value);
                    setSearchParams(searchParams);
                  }}
                />
              </div>

              <div className={styles.filter}>
                Task deadline to
                <input
                  type='date'
                  className={styles.filterDateInput}
                  value={String(taskDeadlineToParam)}
                  onChange={(event) => {
                    searchParams.set('task-deadline-to', event.target.value);
                    setSearchParams(searchParams);
                  }}
                />
              </div>

              <div className={styles.clear_filter}>
                Clear
                <button
                  className={classNames(
                    styles.clear_filter_button,
                    { [styles.clear_filter_button_disabled]: !isClearButtonActive },
                  )}
                  onClick={handleFiltersClear}
                >
                </button>
              </div>
            </div>

            <div className={styles.users}>
              {visibleUsers.map((user, index) => {
                const tasksDone = visibleTasks.reduce((sum, task) => (
                  task.status === Status.DONE && task.userId === user.id
                    ? sum + 1
                    : sum
                ), 0);

                const message = `${tasksDone} tasks done`;

                return (
                  <UserStatisticsCard
                    user={user}
                    index={index + 1}
                    value={message}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};