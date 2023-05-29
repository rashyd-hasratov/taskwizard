import { useState } from 'react';
import classNames from 'classnames';

import { Status } from '../../types/Status';

import styles from './StatusSelect.module.scss';

const statusTitles = Object.values(Status);

type StatusSelectProps = {
  selectedStatus: Status,
  onSelect: (status: Status) => void,
};

export const StatusSelect = ({
  selectedStatus,
  onSelect
}: StatusSelectProps) => {
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
        {selectedStatus}
      </button>
      <div
        className={classNames(
          styles.select_list,
          { [styles.select_list_visible]: isSelectActive },
        )}
      >
        {statusTitles.map(statusTitle => {
          return (
            <button
              key={statusTitle}
              className={styles.select_item}
              onClick={(event) => {
                event.preventDefault();

                onSelect(statusTitle);
              }}
            >
              {statusTitle}
            </button>
          );
        })}
      </div>
    </div>
  );
};