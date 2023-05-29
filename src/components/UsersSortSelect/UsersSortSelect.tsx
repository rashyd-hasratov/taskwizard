import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

import { SortUsersBy } from '../../types/SortUsersBy';

import styles from './UsersSortSelect.module.scss';

const sortUsersByValues = Object.values(SortUsersBy);

const formatSortValue = (sortValue: string) => {
  const formatted = sortValue
    .split('-')
    .join(' ');

  return formatted[0].toUpperCase() + formatted.slice(1);
};

export const UsersSortSelect = () => {
  const [isSelectActive, setIsSelectActive] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  let currSortFilter = searchParams.get('sort');

  if (currSortFilter) {
    const formatted = currSortFilter
      .split('-')
      .join(' ');

    currSortFilter = formatted[0].toUpperCase() + formatted.slice(1);
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
    if (value === 'name') {
      searchParams.delete('sort');
    } else {
      searchParams.set('sort', value);
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
        {currSortFilter || 'Name'}
      </button>
      <div
        className={classNames(
          styles.select_list,
          { [styles.select_list_visible]: isSelectActive },
        )}
      >
        {sortUsersByValues.map(value => {
          return (
            <button
              key={value}
              className={styles.select_item}
              onClick={(event) => {
                event.preventDefault();

                handleSelectItemClick(value);
              }}
            >
              {formatSortValue(value)}
            </button>
          );
        })}
      </div>
    </div>
  );
};