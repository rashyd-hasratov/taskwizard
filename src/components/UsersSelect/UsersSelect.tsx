import { useState, useContext } from 'react';
import classNames from 'classnames';

import { AppContext } from '../AppContext';
import { User } from '../../types/User';

import styles from './UsersSelect.module.scss';

type UserSelectProps = {
  selectedUser: User,
  onSelect: (user: User) => void,
};

export const UserSelect = ({
  selectedUser,
  onSelect
}: UserSelectProps) => {
  const { users } = useContext(AppContext);
  const [isSelectActive, setIsSelectActive] = useState(false);

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
        {selectedUser.name}
      </button>
      <div
        className={classNames(
          styles.select_list,
          { [styles.select_list_visible]: isSelectActive },
        )}
      >
        {users.map(user => {
          return (
            <button
              key={user.id}
              className={styles.select_item}
              onClick={(event) => {
                event.preventDefault();

                onSelect(user);
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