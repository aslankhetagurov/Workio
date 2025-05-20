import { Link } from 'react-router-dom';
import { GiMoneyStack } from 'react-icons/gi';
import { IoLocationOutline, IoTimeOutline } from 'react-icons/io5';

import { ResumeWithUser } from '@/types/database.types';
import defaultAvatar from '@/assets/default-avatar.png';
import { formatDateToTimeAgo } from '@/helpers/formatDateToTimeAgo';
import styles from './ResumeItem.module.scss';

interface IResumeItemProps {
    data: ResumeWithUser;
}

const ResumeItem = ({ data }: IResumeItemProps) => {
    const { id, title, location, created_at, salary_per_hour, users, skills } =
        data;

    return (
        <li className={styles['resume-item']}>
            <Link
                className={styles['resume-item__link']}
                to={`/resumes/${id}`}
                aria-label={`Resume ${title} by ${users?.full_name}`}
            >
                <img
                    className={styles['resume-item__avatar']}
                    src={users?.avatar_url || defaultAvatar}
                    alt={users?.full_name || 'User Avatar'}
                />

                <div className={styles['resume-item__content']}>
                    <div className={styles['resume-item__info']}>
                        <h4 className={styles['resume-item__username']}>
                            {users?.full_name}
                        </h4>
                        <ul className={styles['resume-item__other-info']}>
                            <li
                                className={
                                    styles['resume-item__other-info-item']
                                }
                            >
                                <span
                                    className={`${styles['resume-item__text']} ${styles['resume-item__title']}`}
                                >
                                    {title}
                                </span>
                            </li>
                            <li
                                className={
                                    styles['resume-item__other-info-item']
                                }
                            >
                                <IoLocationOutline aria-hidden="true" />
                                <span className={styles['resume-item__text']}>
                                    {location}
                                </span>
                            </li>
                            <li
                                className={
                                    styles['resume-item__other-info-item']
                                }
                            >
                                <IoTimeOutline aria-hidden="true" />
                                <span className={styles['resume-item__text']}>
                                    {formatDateToTimeAgo(created_at)}
                                </span>
                            </li>
                            <li
                                className={
                                    styles['resume-item__other-info-item']
                                }
                            >
                                <GiMoneyStack
                                    className={
                                        styles['resume-item__salary-icon']
                                    }
                                    aria-hidden="true"
                                />
                                <span className={styles['resume-item__text']}>
                                    {salary_per_hour} / hour
                                </span>
                            </li>
                        </ul>
                    </div>

                    <ul className={styles['resume-item__skills']}>
                        {skills?.map((skill, i) => (
                            <li
                                key={`${skill}-${i}`}
                                className={styles['resume-item__skill']}
                            >
                                {skill}
                            </li>
                        ))}
                    </ul>
                </div>
            </Link>
        </li>
    );
};

export default ResumeItem;
