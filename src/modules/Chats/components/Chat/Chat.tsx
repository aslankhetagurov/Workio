import { Link } from 'react-router-dom';
import { FiArrowUpRight } from 'react-icons/fi';
import { TiMessages } from 'react-icons/ti';
import { IoIosArrowDropleft } from 'react-icons/io';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
    selectActiveChatData,
    setActiveChatData,
} from '../../store/chatsSlice';
import { selectUserData } from '@/modules/Auth';
import avatar from '@/shared/assets/images/default-avatar.png';
import companyAvatar from '@/shared/assets/images/company-logo.webp';
import MessagesList from '../MessagesList/MessagesList';
import ChatsForm from '../ChatsForm/ChatsForm';
import styles from './Chat.module.scss';

const Chat = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUserData);
    const isApplicant = user?.role === 'applicant';
    const activeChatData = useAppSelector(selectActiveChatData);
    const handleClearActiveChat = () => {
        dispatch(setActiveChatData(null));
    };

    if (!activeChatData) {
        return (
            <div className={styles.chat__empty}>
                <TiMessages className={styles['chat__empty-icon']} />
                <p className={styles['chat__empty-text']}>Select a chat...</p>
            </div>
        );
    }

    const { vacancy_id, resume_id, vacancies, resumes, applicant, employer } =
        activeChatData;

    return (
        <div className={styles.chat}>
            <header className={styles.chat__header}>
                <div className={styles.chat__info}>
                    <img
                        className={styles.chat__img}
                        src={
                            isApplicant
                                ? applicant.avatar_url || companyAvatar
                                : employer.avatar_url || avatar
                        }
                        alt={`${user?.role} avatar`}
                    />

                    <p className={styles.chat__title}>
                        {isApplicant
                            ? vacancies.companies?.name
                            : resumes.users?.full_name}
                    </p>
                </div>

                <div className={styles.chat__links}>
                    <div className={styles.chat__vacancy}>
                        <div className={styles['chat__vacancy-info']}>
                            <p className={styles['chat__vacancy-title']}>
                                Vacancy
                            </p>
                            <p className={styles['chat__vacancy-name']}>
                                {vacancies.title}
                            </p>
                        </div>

                        <Link
                            className={styles.chat__link}
                            to={`/vacancies/${vacancy_id}`}
                        >
                            <FiArrowUpRight className={styles.chat__arrow} />
                        </Link>
                    </div>

                    <div className={styles.chat__resume}>
                        <div className={styles['chat__resume-info']}>
                            <p className={styles['chat__resume-title']}>
                                Resume
                            </p>
                            <p className={styles['chat__resume-name']}>
                                {resumes.title}
                            </p>
                        </div>

                        <Link
                            className={styles.chat__link}
                            to={`/resumes/${resume_id}`}
                        >
                            <FiArrowUpRight className={styles.chat__arrow} />
                        </Link>
                    </div>
                </div>

                <button
                    className={styles.chat__close}
                    onClick={handleClearActiveChat}
                >
                    <IoIosArrowDropleft
                        className={styles['chat__close-icon']}
                    />
                </button>
            </header>

            <MessagesList activeChatData={activeChatData} userData={user} />

            <ChatsForm />
        </div>
    );
};

export default Chat;
