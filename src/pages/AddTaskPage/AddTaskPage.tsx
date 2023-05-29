import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import classnames from 'classnames';

import { User } from '../../types/User';
import { Task } from '../../types/Task';
import { Status } from '../../types/Status';
import { AppContext } from '../../components/AppContext';
import { Footer } from '../../components/Footer/Footer';

import styles from './AddTaskPage.module.scss';
import commonStyles from '../../styles/Common.module.scss';
import { UserSelect } from '../../components/UsersSelect/UsersSelect';
import { Header } from '../../components/Header/Header';

const formatDateToString = (date: Date) => {
  const dateDate = date.getDate() < 10
    ? `0${date.getDate()}`
    : `${date.getDate()}`;

  const dateMonth = date.getMonth() < 9
    ? `0${date.getMonth() + 1}`
    : `${date.getMonth() + 1}`;

  const dateYear = `${date.getFullYear()}`;

  return `${dateYear}-${dateMonth}-${dateDate}`;
};

export const AddTaskPage = () => {
  const { tasks, setTasks, users } = useContext(AppContext);
  const [selectedPerformer, setSelectedPerformer] = useState<User>(users[0]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState(formatDateToString(new Date()));
  const [isTaskAdded, setIsTaskAdded] = useState(false);
  const navigate = useNavigate();

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.currentTarget.value);
  };

  const handleDeadlineChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDeadline(event.currentTarget.value);
  };

  const handleSelectItemClick = (user: User) => {
    setSelectedPerformer(user);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const maxTaskId = Math.max(...tasks.map(({ id }) => id)) || 0;

    console.log(deadline);

    const deadlineSplit = deadline
      .split('-');

    console.log(deadlineSplit[0]);

    const deadlineFormatted = new Date(Number(deadlineSplit[0]), Number(deadlineSplit[1])- 1, Number(deadlineSplit[2]));

    console.log(deadlineFormatted);

    const newTask: Task = {
      id: maxTaskId + 1,
      title,
      description,
      status: Status.ASSIGNED,
      deadline: deadlineFormatted,
      created_at: new Date(),
      userId: selectedPerformer.id,
    };

    console.log(newTask);

    setTasks(prev => [...prev, newTask]);
    setTitle('');
    setDescription('');
    setDeadline('');
    setIsTaskAdded(true);
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  return (
    <div className={commonStyles.page}>
      <Header />

      <main className={commonStyles.main}>
        <div className={commonStyles.container}>
          <div className={commonStyles.main_content}>
            <div className={commonStyles.main_header}>
              <h1 className={commonStyles.page_title}>Add New Task</h1>
            </div>

            {isTaskAdded
              ? (
                <p className={styles.success_text}>
                  Your task was successfully added!<br/>
                  You will be automatically navigated to Home Page.
                </p>
              )
              : (
                <form
                  className={styles.form}
                  onSubmit={handleSubmit}
                >
                  <div className={styles.inputs}>
                    <label className={styles.input_label}>
                      Title*
                      <input
                        type='text'
                        placeholder='Enter task title...'
                        className={styles.input}
                        onChange={handleTitleChange}
                        required
                      />
                    </label>

                    <label className={styles.input_label}>
                      Description*
                      <input
                        type='text'
                        placeholder='Add task description...'
                        className={styles.input}
                        onChange={handleDescriptionChange}
                        required
                      />
                    </label>

                    <div className={styles.input_label}>
                      Performer*
                      <UserSelect
                        selectedUser={selectedPerformer}
                        onSelect={handleSelectItemClick}
                      />
                    </div>

                    <label className={styles.input_label}>
                      Deadline*
                      <input
                        type='date'
                        placeholder='Add task description...'
                        className={classnames(
                          styles.input,
                          styles.input_date
                        )}
                        value={deadline}
                        onChange={handleDeadlineChange}
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