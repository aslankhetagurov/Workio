import { FaRegBookmark } from 'react-icons/fa6';

import { VacancyWithCompany } from '@/shared/types/database.types';
import PrimaryButton from '@/shared/UI/PrimaryButton/PrimaryButton';
import logo from '@/shared/assets/images/company-logo.webp';
import styles from './SingleVacancyHeader.module.scss';

interface SingleVacancyHeaderProps {
    data: VacancyWithCompany;
}

const SingleVacancyHeader = ({ data }: SingleVacancyHeaderProps) => {
    if (!data) return null;

    return (
        <header className={styles.header}>
            <img
                className={styles.header__logo}
                src={data.companies?.logo_url || logo}
                alt={
                    data.companies?.name
                        ? `${data.companies.name} logo`
                        : 'Company logo'
                }
            />

            <h3
                className={styles.header__title}
                aria-label="Vacancy title"
                id="vacancy-heading"
            >
                {data.title}
            </h3>

            <div className={styles.header__buttons}>
                <PrimaryButton
                    label="Apply"
                    ariaLabel="Apply for vacancy"
                    style={{ width: '200px' }}
                />
                <button
                    className={styles.header__bookmark}
                    aria-label="Save vacancy to bookmarks"
                    type="button"
                >
                    <FaRegBookmark />
                </button>
            </div>
        </header>
    );
};

export default SingleVacancyHeader;
