import { useContext, useMemo } from 'react';
import classNames from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';

import { SortUsersBy } from '../../types/SortUsersBy';
import { AppContext } from '../../components/AppContext';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { UsersSortSelect } from '../../components/UsersSortSelect/UsersSortSelect';

import styles from './UsersPage.module.scss';
import commonStyles from '../../styles/Common.module.scss';
import { UserCard } from '../../components/UserCard/UserCard';

const formatStringDateToDate = (stringDate: string) => {
  const dateSplit = stringDate
    .split('-')
    .map (part => Number(part));

  const date = new Date(dateSplit[0], dateSplit[1] - 1, dateSplit[2]);

  return date;
};

export const UsersPage = () => {
  const { users } = useContext(AppContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const sortParam = searchParams.get('sort') || 'name';
  const addedFromParam = searchParams.get('added-from');
  const addedToParam = searchParams.get('added-to');

  const isClearButtonActive = addedFromParam || addedToParam;

  let visibleUsers = useMemo(() => {
    let filteredUsers = users;

    if (addedFromParam) {
      const addedFromDate = formatStringDateToDate(addedFromParam);

      filteredUsers = filteredUsers.filter(({ created_at }) => (
        created_at.getTime() >= addedFromDate.getTime()
      ));
    }

    if (addedToParam) {
      const addedToDate = formatStringDateToDate(addedToParam);

      filteredUsers = filteredUsers.filter(({ created_at }) => (
        created_at.getTime() <= addedToDate.getTime()
      ));
    }

    filteredUsers.sort((userA, userB) => {
      switch (sortParam) {
        case SortUsersBy.NAME:
          return userA.name.localeCompare(userB.name);

        case SortUsersBy.FROM_OLD_TO_NEW:
          return userA.created_at.getTime() - userB.created_at.getTime();

        case SortUsersBy.FROM_NEW_TO_OLD:
          return userB.created_at.getTime() - userA.created_at.getTime();

        default:
          return 0;
      }
    });

    return filteredUsers;
  }, [sortParam, addedFromParam, addedToParam, users]);

  const handleFiltersClear = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    searchParams.delete('added-from');
    searchParams.delete('added-to');

    setSearchParams(searchParams);
  };

  return (
    <div className={commonStyles.page}>
      <Header />

      <main className={commonStyles.main}>
        <div className={commonStyles.container}>
          <div className={commonStyles.main_content}>
            <div className={commonStyles.main_header}>
              <h1 className={commonStyles.page_title}>Users</h1>

              <Link to={'/users/add'} className={styles.add_link} />
            </div>

            <div className={styles.filters}>
              <div className={styles.filter}>
                Sort by
                <UsersSortSelect />
              </div>

              <div className={styles.filter}>
                Added from
                <input
                  type='date'
                  className={styles.filterDateInput}
                  value={String(addedFromParam)}
                  onChange={(event) => {
                    searchParams.set('added-from', event.target.value);
                    setSearchParams(searchParams);
                  }}
                />
              </div>

              <div className={styles.filter}>
                Added to
                <input
                  type='date'
                  className={styles.filterDateInput}
                  value={String(addedToParam)}
                  onChange={(event) => {
                    searchParams.set('added-to', event.target.value);
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
              {visibleUsers.map(user => (
                <UserCard key={user.id} user={user} />
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};