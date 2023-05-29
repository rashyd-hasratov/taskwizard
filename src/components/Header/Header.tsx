import { Link } from 'react-router-dom';

import styles from './Header.module.scss';
import commonStyles from '../../styles/Common.module.scss';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={commonStyles.container}>
        <div className={styles.header_content}>
          <Link to={'/'} className={styles.header_logo}>
            TaskWizard
          </Link>

          <div className={styles.header_actions}>
            <nav className={styles.header_nav}>
              <ul className={styles.header_nav_list}>
                <li className={styles.header_nav_item}>
                  <Link
                    to={'/users'}
                    className={styles.header_nav_link}
                  >
                    Users
                  </Link>
                </li>
                <li className={styles.header_nav_item}>
                  <Link
                    to={'/statistics'}
                    className={styles.header_nav_link}
                  >
                    Statistics
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};