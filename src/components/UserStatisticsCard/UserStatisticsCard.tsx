import { User } from '../../types/User';

import styles from './UserStatisticsCard.module.scss';

type UserCardProps = {
  user: User,
  index: number,
  value: string,
};

export const UserStatisticsCard = ({ user, index, value }: UserCardProps) => {
  return (
    <div className={styles.card}>
      <h2 className={styles.user_title}>
        {`${index}. ${user.name}`}
      </h2>

      <p className={styles.value}>
        {value}
      </p>
    </div>
  );
};