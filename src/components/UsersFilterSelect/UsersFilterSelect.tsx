import { useState, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

import { AppContext } from '../AppContext';
import { User } from '../../types/User';

import styles from './UsersFilterSelect.module.scss';

const formatSearchParam = (searchParam: string) => {
  return searchParam
    .split('-')
    .join(' ');
};

export const UsersFilterSelect = () => {
  const { users } = useContext(AppContext);
  const [isSelectActive, setIsSelectActive] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  let currUserFilter = searchParams.get('user');

  if (currUserFilter) {
    const formatted = formatSearchParam(currUserFilter);

    const user = users.find(({ name }) => (
      name.toLowerCase() === formatted
    )) as User;

    currUserFilter = user.name;
  }

  const handleSelecButtonClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    setIsSelectActive(prev => !prev);
  };

  const handleSelectBlur = () => {
    setTimeout(() => {
      setIsSelectActive(false);
    }, 200);
  };

  const handleSelectItemClick = (value: string) => {
    if (value === 'All') {
      searchParams.delete('user');
    } else {
      searchParams.set('user', value.toLowerCase().split(' ').join('-'));
    }

    setSearchParams(searchParams);
  };

  return (
    <div className={styles.select}>
      <button
        className={classNames(
          styles.select_button,
          { [styles.select_button_active]: isSelectActive },
        )}
        onClick={handleSelecButtonClick}
        onBlur={handleSelectBlur}
      >
        {currUserFilter || 'All'}
      </button>
      <div
        className={classNames(
          styles.select_list,
          { [styles.select_list_visible]: isSelectActive },
        )}
      >
        <button
          className={styles.select_item}
          onClick={(event) => {
            event.preventDefault();

            handleSelectItemClick('All');
          }}
        >
          All
        </button>
        {users.map(user => {
          return (
            <button
              key={user.id}
              className={styles.select_item}
              onClick={(event) => {
                event.preventDefault();

                handleSelectItemClick(user.name);
              }}
            >
              {user.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};