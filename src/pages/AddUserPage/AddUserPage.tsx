import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { User } from '../../types/User';
import { AppContext } from '../../components/AppContext';
import { Footer } from '../../components/Footer/Footer';

import styles from './AddUserPage.module.scss';
import commonStyles from '../../styles/Common.module.scss';
import { Header } from '../../components/Header/Header';

export const AddUserPage = () => {
  const { users, setUsers} = useContext(AppContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isUserAdded, setIsUserAdded] = useState(false);
  const navigate = useNavigate();

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.currentTarget.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const maxUserId = Math.max(...users.map(({ id }) => id)) || 0;

    const newUser: User = {
      id: maxUserId + 1,
      name,
      email,
      created_at: new Date(),
    };

    setUsers(prev => [...prev, newUser]);
    setName('');
    setEmail('');
    setIsUserAdded(true);
    setTimeout(() => {
      navigate('/users');
    }, 1000);
  };

  return (
    <div className={commonStyles.page}>
      <Header />

      <main className={commonStyles.main}>
        <div className={commonStyles.container}>
          <div className={commonStyles.main_content}>
            <div className={commonStyles.main_header}>
              <h1 className={commonStyles.page_title}>Add New User</h1>
            </div>

            {isUserAdded
              ? (
                <p className={styles.success_text}>
                  The user was successfully added!<br/>
                  You will be automatically navigated to Users Page.
                </p>
              )
              : (
                <form
                  className={styles.form}
                  onSubmit={handleSubmit}
                >
                  <div className={styles.inputs}>
                    <label className={styles.input_label}>
                      Name*
                      <input
                        type='text'
                        placeholder='Enter user name...'
                        className={styles.input}
                        onChange={handleNameChange}
                        required
                      />
                    </label>

                    <label className={styles.input_label}>
                      Email*
                      <input
                        type='email'
                        placeholder='Enter email...'
                        className={styles.input}
                        onChange={handleEmailChange}
                        required
                      />
                    </label>
                  </div>

                  <button
                    type='submit'
                    className={styles.submit_button}
                  >
                    Add
                  </button>
                </form>
              )
            }
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};