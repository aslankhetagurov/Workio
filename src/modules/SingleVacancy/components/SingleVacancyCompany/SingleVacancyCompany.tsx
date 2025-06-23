import { Link } from 'react-router-dom';

import { CompanyWithUser } from '@/shared/types/database.types';
import companyLogo from '@/shared/assets/images/company-logo.webp';
import styles from './SingleVacancyCompany.module.scss';

interface SingleVacancyCompanyProps {
    companyData: CompanyWithUser;
}

const SingleVacancyCompany = ({ companyData }: SingleVacancyCompanyProps) => {
    const {
        logo_url,
        name,
        id,
        industry,
        size_range,
        founded_year,
        users,
        location,
        website,
    } = companyData;

    return (
        <article className={styles.company}>
            <header className={styles.company__header}>
                <img
                    className={styles.company__logo}
                    src={logo_url || companyLogo}
                    alt={`${name} logo`}
                />
                <div className={styles['company__header-info']}>
                    <h4 className={styles.company__title}>{name}</h4>
                    <Link
                        className={styles.company__link}
                        to={`/companies/${id}`}
                    >
                        View company profile
                    </Link>
                </div>
            </header>

            <ul className={styles.company__info}>
                <li className={styles['company__info-item']}>
                    <span className={styles['company__info-title']}>
                        Industry:
                    </span>
                    <span className={styles['company__info-text']}>
                        {industry}
                    </span>
                </li>

                <li className={styles['company__info-item']}>
                    <span className={styles['company__info-title']}>
                        Company size:
                    </span>
                    <span className={styles['company__info-text']}>
                        {size_range}
                    </span>
                </li>

                <li className={styles['company__info-item']}>
                    <span className={styles['company__info-title']}>
                        Founded in:
                    </span>
                    <span className={styles['company__info-text']}>
                        {founded_year}
                    </span>
                </li>

                <li className={styles['company__info-item']}>
                    <span className={styles['company__info-title']}>
                        Phone:
                    </span>
                    <span className={styles['company__info-text']}>
                        {users?.phone}
                    </span>
                </li>

                <li className={styles['company__info-item']}>
                    <span className={styles['company__info-title']}>
                        Email:
                    </span>
                    <span className={styles['company__info-text']}>
                        {users?.email}
                    </span>
                </li>

                <li className={styles['company__info-item']}>
                    <span className={styles['company__info-title']}>
                        Location:
                    </span>
                    <span className={styles['company__info-text']}>
                        {location}
                    </span>
                </li>
            </ul>

            {website && (
                <a
                    href={website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.company__website}
                    aria-label={`Open ${name} website`}
                >
                    {website}
                </a>
            )}
        </article>
    );
};

export default SingleVacancyCompany;
