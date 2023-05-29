import { User } from '../../types/User';

import styles from './UserCard.module.scss';

type UserCardProps = {
  user: User,
};

export const UserCard = ({ user }: UserCardProps) => {
  return (
    <div className={styles.card}>
      <h2 className={styles.user_name}>
        {user.name}
      </h2>

      <p className={styles.user_email}>
        {user.email}
      </p>
    </div>
  );
};