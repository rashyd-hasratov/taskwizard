import { useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import classnames from 'classnames';

import { User } from '../../types/User';
import { Status } from '../../types/Status';
import { AppContext } from '../../components/AppContext';

import styles from './TaskPage.module.scss';
import commonStyles from '../../styles/Common.module.scss';
import { UserSelect } from '../../components/UsersSelect/UsersSelect';
import { StatusSelect } from '../../components/StatusSelect/StatusSelect';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';

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

const formatStringToDate = (string: string) => {
  const dateSplit = string.split('-').map(part => Number(part));
  const date = new Date(dateSplit[0], dateSplit[1] - 1, dateSplit[2]);

  return date;
};

export const TaskPage = () => {
  const { tasks, users } = useContext(AppContext);
  const { pathname } = useLocation();

  const taskId = Number(pathname.slice(1));
  let task = tasks.find(({ id }) => id === taskId);
  const currentPerformer = users.find(({ id }) => id === task?.userId);

  const [selectedPerformer, setSelectedPerformer] = useState<User>(currentPerformer as User);
  const [title, setTitle] = useState(String(task?.title));
  const [description, setDescription] = useState(String(task?.description));
  const [status, setStatus] = useState<Status>(task?.status as Status);
  const [deadline, setDeadline] = useState(formatDateToString(task?.deadline as Date));
  const [isSuccessMessageVisible, setIsSuccessMessageVisible] = useState(false);

  const showSuccessMessage = () => {
    setIsSuccessMessageVisible(true);

    setTimeout(() => {
      setIsSuccessMessageVisible(false)
    }, 1000);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.currentTarget.value);
  };

  const handleDeadlineChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDeadline(event.currentTarget.value);
  };

  const handleUsersSelectItemClick = (user: User) => {
    setSelectedPerformer(user);
  };

  const handleStatusSelectItemClick = (status: Status) => {
    setStatus(status);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (task) {
      task.title = title;
      task.description = description;
      task.userId = selectedPerformer.id;
      task.status = status;
      task.deadline = formatStringToDate(deadline);
    }

    showSuccessMessage();
  };

  return (
    <div className={commonStyles.page}>
      <Header />

      <main className={commonStyles.main}>
        <div className={commonStyles.container}>
          <div className={commonStyles.main_content}>
            <div className={commonStyles.main_header}>
              <h1 className={commonStyles.page_title}>Task Details</h1>
            </div>

            <form
              className={styles.form}
              onSubmit={handleSubmit}
            >
              <div className={styles.inputs}>
                <label className={styles.input_label}>
                  Title
                  <input
                    type='text'
                    placeholder='Enter task title...'
                    className={styles.input}
                    value={title}
                    onChange={handleTitleChange}
                    required
                  />
                </label>

                <label className={styles.input_label}>
                  Description
                  <input
                    type='text'
                    placeholder='Add task description...'
                    className={styles.input}
                    value={description}
                    onChange={handleDescriptionChange}
                    required
                  />
                </label>

                <div className={styles.input_label}>
                  Performer
                  <UserSelect
                    selectedUser={selectedPerformer}
                    onSelect={handleUsersSelectItemClick}
                  />
                </div>

                <div className={styles.input_label}>
                  Status
                  <StatusSelect
                    selectedStatus={status}
                    onSelect={handleStatusSelectItemClick}
                  />
                </div>

                <label className={styles.input_label}>
                  Deadline
                  <input
                    type='date'
                    placeholder='Add task description...'
                    className={classnames(
                      styles.input,
                          styles.input_date
                    )}
                    defaultValue={deadline}
                    onChange={handleDeadlineChange}
                    required
                  />
                </label>

                <div className={styles.input_label}>
                  Creation date
                  <p className={styles.creation_date}>
                    {formatDateToString(task?.created_at as Date)}
                  </p>
                </div>
              </div>

              <button
                type='submit'
                className={styles.submit_button}
              >
                Save
              </button>
            </form>

            <div
              className={classnames(
                styles.success_notification,
                { [styles.success_notification_visible]: isSuccessMessageVisible },
              )}
            >
              Saved
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};