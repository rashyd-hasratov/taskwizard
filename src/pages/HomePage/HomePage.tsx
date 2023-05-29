import { Link, useSearchParams } from 'react-router-dom';
import { useContext, useMemo } from 'react';
import classNames from 'classnames';

import { AppContext } from '../../components/AppContext';

import styles from './HomePage.module.scss';
import commonStyles from '../../styles/Common.module.scss';
import { Board } from '../../components/Board/Board';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { UsersFilterSelect } from '../../components/UsersFilterSelect/UsersFilterSelect';
import { User } from '../../types/User';

const formatUserParam = (userParam: string) => {
  return userParam.split('-').join(' ');
};

const formatStringDateToDate = (stringDate: string) => {
  const dateSplit = stringDate
    .split('-')
    .map (part => Number(part));

  const date = new Date(dateSplit[0], dateSplit[1] - 1, dateSplit[2]);

  return date;
};

export const HomePage = () => {
  const { tasks, users } = useContext(AppContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const userParam = searchParams.get('user');
  const createdFromParam = searchParams.get('created-from');
  const createdToParam = searchParams.get('created-to');
  const deadlineFromParam = searchParams.get('deadline-from');
  const deadlineToParam = searchParams.get('deadline-to');

  const isClearButtonActive = userParam
    || createdFromParam
    || createdToParam
    || deadlineFromParam
    || deadlineToParam;

  let visibleTasks = useMemo(() => {
    let filteredTasks = tasks;

    if (createdFromParam) {
      const createdFromDate = formatStringDateToDate(createdFromParam);

      filteredTasks = filteredTasks.filter(({ created_at }) => (
        created_at.getTime() >= createdFromDate.getTime()
      ));
    }

    if (createdToParam) {
      const createdToDate = formatStringDateToDate(createdToParam);

      filteredTasks = filteredTasks.filter(({ created_at }) => (
        created_at.getTime() <= createdToDate.getTime()
      ));
    }

    if (deadlineFromParam) {
      const deadlineFromDate = formatStringDateToDate(deadlineFromParam);

      filteredTasks = filteredTasks.filter(({ deadline }) => (
        deadline.getTime() >= deadlineFromDate.getTime()
      ));
    }

    if (deadlineToParam) {
      const deadlineToDate = formatStringDateToDate(deadlineToParam);

      filteredTasks = filteredTasks.filter(({ deadline }) => (
        deadline.getTime() <= deadlineToDate.getTime()
      ));
    }

    if (userParam) {
      const user = users.find(({ name }) => (
        name.toLowerCase() === formatUserParam(userParam)
      )) as User;

      filteredTasks = filteredTasks.filter(({ userId }) => userId === user.id);
    }

    return filteredTasks;
  }, [
    userParam,
    createdFromParam,
    createdToParam,
    deadlineFromParam,
    deadlineToParam,
    tasks,
    users,
  ]);

  const handleFiltersClear = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    searchParams.delete('user');
    searchParams.delete('created-from');
    searchParams.delete('created-to');
    searchParams.delete('deadline-from');
    searchParams.delete('deadline-to');

    setSearchParams(searchParams);
  };

  return (
    <div className={commonStyles.page}>
      <Header />

      <main className={commonStyles.main}>
        <div className={commonStyles.container}>
          <div className={commonStyles.main_content}>
            <div className={commonStyles.main_header}>
              <h1 className={commonStyles.page_title}>Tasks</h1>

              <Link to={'/add'} className={styles.add_link} />
            </div>

            <div className={styles.filters}>
              <div className={styles.filter}>
                Performer
                <UsersFilterSelect />
              </div>

              <div className={styles.filter}>
                Created from
                <input
                  type='date'
                  className={styles.filterDateInput}
                  value={String(createdFromParam) || ''}
                  onChange={(event) => {
                    searchParams.set('created-from', event.target.value);
                    setSearchParams(searchParams);
                  }}
                />
              </div>

              <div className={styles.filter}>
                Created to
                <input
                  type='date'
                  className={styles.filterDateInput}
                  value={String(createdToParam)}
                  onChange={(event) => {
                    searchParams.set('created-to', event.target.value);
                    setSearchParams(searchParams);
                  }}
                />
              </div>

              <div className={styles.filter}>
                Deadline from
                <input
                  type='date'
                  className={styles.filterDateInput}
                  value={String(deadlineFromParam)}
                  onChange={(event) => {
                    searchParams.set('deadline-from', event.target.value);
                    setSearchParams(searchParams);
                  }}
                />
              </div>

              <div className={styles.filter}>
                Deadline to
                <input
                  type='date'
                  className={styles.filterDateInput}
                  value={String(deadlineToParam)}
                  onChange={(event) => {
                    searchParams.set('deadline-to', event.target.value);
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

            <Board tasks={visibleTasks} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};