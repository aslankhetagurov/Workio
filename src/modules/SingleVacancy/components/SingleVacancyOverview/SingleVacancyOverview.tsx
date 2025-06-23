import {
    CiBadgeDollar,
    CiCalendar,
    CiClock2,
    CiGlobe,
    CiLocationOn,
    CiUser,
    CiViewList,
} from 'react-icons/ci';
import { PiBriefcaseThin } from 'react-icons/pi';

import { VacancyWithCompany } from '@/shared/types/database.types';
import { formatDateToTimeAgo } from '@/shared/lib/formatDateToTimeAgo';
import { formatToK } from '@/shared/lib/formatToK';
import styles from './SingleVacancyOverview.module.scss';

interface SingleVacancyOverviewProps {
    vacancyData: VacancyWithCompany;
}

const SingleVacancyOverview = ({ vacancyData }: SingleVacancyOverviewProps) => {
    const {
        title,
        location,
        salary_per_month,
        employment,
        accessibility,
        category,
        created_at,
        hours,
    } = vacancyData;

    return (
        <article className={styles.overview}>
            <h4 className={styles.overview__title}>Vacancy Overview</h4>
            <ul className={styles.overview__list}>
                <li className={styles.overview__item}>
                    <CiUser
                        className={styles.overview__icon}
                        aria-hidden="true"
                        focusable="false"
                    />
                    <div className={styles['overview__item-info']}>
                        <span className={styles['overview__item-title']}>
                            Vacancy Title:
                        </span>
                        <span className={styles['overview__item-text']}>
                            {title}
                        </span>
                    </div>
                </li>

                <li className={styles.overview__item}>
                    <CiViewList
                        className={styles.overview__icon}
                        aria-hidden="true"
                        focusable="false"
                    />
                    <div className={styles['overview__item-info']}>
                        <span className={styles['overview__item-title']}>
                            Category:
                        </span>
                        <span className={styles['overview__item-text']}>
                            {category}
                        </span>
                    </div>
                </li>

                <li className={styles.overview__item}>
                    <CiCalendar
                        className={styles.overview__icon}
                        aria-hidden="true"
                        focusable="false"
                    />
                    <div className={styles['overview__item-info']}>
                        <span className={styles['overview__item-title']}>
                            Date Posted:
                        </span>
                        <span className={styles['overview__item-text']}>
                            {formatDateToTimeAgo(created_at)}
                        </span>
                    </div>
                </li>

                <li className={styles.overview__item}>
                    <CiLocationOn
                        className={styles.overview__icon}
                        aria-hidden="true"
                        focusable="false"
                    />
                    <div className={styles['overview__item-info']}>
                        <span className={styles['overview__item-title']}>
                            Location:
                        </span>
                        <span className={styles['overview__item-text']}>
                            {location}
                        </span>
                    </div>
                </li>

                <li className={styles.overview__item}>
                    <CiBadgeDollar
                        className={styles.overview__icon}
                        aria-hidden="true"
                        focusable="false"
                    />
                    <div className={styles['overview__item-info']}>
                        <span className={styles['overview__item-title']}>
                            Salary:
                        </span>
                        <span className={styles['overview__item-text']}>
                            {formatToK(salary_per_month)}
                        </span>
                    </div>
                </li>
                <li className={styles.overview__item}>
                    <PiBriefcaseThin
                        className={styles.overview__icon}
                        aria-hidden="true"
                        focusable="false"
                    />
                    <div className={styles['overview__item-info']}>
                        <span className={styles['overview__item-title']}>
                            Employment:
                        </span>
                        <span className={styles['overview__item-text']}>
                            {employment}
                        </span>
                    </div>
                </li>
                <li className={styles.overview__item}>
                    <CiGlobe
                        className={styles.overview__icon}
                        aria-hidden="true"
                        focusable="false"
                    />
                    <div className={styles['overview__item-info']}>
                        <span className={styles['overview__item-title']}>
                            Accessibility:
                        </span>
                        <span className={styles['overview__item-text']}>
                            {accessibility}
                        </span>
                    </div>
                </li>
                <li className={styles.overview__item}>
                    <CiClock2
                        className={styles.overview__icon}
                        aria-hidden="true"
                        focusable="false"
                    />
                    <div className={styles['overview__item-info']}>
                        <span className={styles['overview__item-title']}>
                            Hours:
                        </span>
                        <span className={styles['overview__item-text']}>
                            {hours} h/week
                        </span>
                    </div>
                </li>
            </ul>
        </article>
    );
};

export default SingleVacancyOverview;
