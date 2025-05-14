import { Link } from 'react-router-dom';
import { GiMoneyStack } from 'react-icons/gi';
import { FaBuilding } from 'react-icons/fa';
import { IoLocationOutline, IoTimeOutline } from 'react-icons/io5';

import { VacancyWithCompany } from '@/types/database.types';
import companyLogo from '@/assets/company-logo.webp';
import { formatToK } from '@/helpers/formatToK';
import { formatDateToTimeAgo } from '@/helpers/formatDateToTimeAgo';
import styles from './VacancyItem.module.scss';

interface IVacancyItemProps {
    data: VacancyWithCompany;
}

const VacancyItem = ({ data }: IVacancyItemProps) => {
    const {
        id,
        title,
        location,
        created_at,
        salary_from,
        salary_to,
        employment,
        accessibility,
        urgent,
        companies,
    } = data;

    return (
        <li className={styles['vacancy-item']}>
            <Link
                className={styles['vacancy-item__link']}
                to={`/vacancies/${id}`}
            >
                <img
                    className={styles['vacancy-item__logo']}
                    src={companies?.logo_url || companyLogo}
                    alt={companies?.name || 'Company logo'}
                />

                <div className={styles['vacancy-item__content']}>
                    <div className={styles['vacancy-item__info']}>
                        <h4 className={styles['vacancy-item__title']}>
                            {title}
                        </h4>
                        <ul className={styles['vacancy-item__other-info']}>
                            <li
                                className={
                                    styles['vacancy-item__other-info-item']
                                }
                            >
                                <span aria-hidden="true">
                                    <FaBuilding />
                                </span>
                                <span className={styles['vacancy-item__text']}>
                                    {companies?.name}
                                </span>
                            </li>
                            <li
                                className={
                                    styles['vacancy-item__other-info-item']
                                }
                            >
                                <span aria-hidden="true">
                                    <IoLocationOutline />
                                </span>
                                <span className={styles['vacancy-item__text']}>
                                    {location}
                                </span>
                            </li>
                            <li
                                className={
                                    styles['vacancy-item__other-info-item']
                                }
                            >
                                <span aria-hidden="true">
                                    <IoTimeOutline />
                                </span>
                                <span className={styles['vacancy-item__text']}>
                                    {formatDateToTimeAgo(created_at)}
                                </span>
                            </li>
                            <li
                                className={
                                    styles['vacancy-item__other-info-item']
                                }
                            >
                                <span aria-hidden="true">
                                    <GiMoneyStack
                                        style={{ fontSize: '16px' }}
                                    />
                                </span>
                                <span className={styles['vacancy-item__text']}>
                                    {formatToK(salary_from)}
                                </span>
                                -
                                <span className={styles['vacancy-item__text']}>
                                    {formatToK(salary_to)}
                                </span>
                            </li>
                        </ul>
                    </div>

                    <ul className={styles['vacancy-item__tags']}>
                        <li
                            className={`${styles['vacancy-item__tag']} ${styles['employment']}`}
                        >
                            {employment}
                        </li>
                        <li
                            className={`${styles['vacancy-item__tag']} ${styles['accessibility']}`}
                        >
                            {accessibility}
                        </li>
                        {urgent && (
                            <li
                                className={`${styles['vacancy-item__tag']} ${styles['urgent']}`}
                            >
                                Urgent
                            </li>
                        )}
                    </ul>
                </div>
            </Link>
        </li>
    );
};

export default VacancyItem;
