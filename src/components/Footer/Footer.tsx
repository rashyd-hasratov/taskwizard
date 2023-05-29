import styles from './Footer.module.scss';
import commonStyles from '../../styles/Common.module.scss';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={commonStyles.container}>
        <div className={styles.footer_content}>
          TaskWizard  
        </div>
      </div>
    </footer>
  );
};