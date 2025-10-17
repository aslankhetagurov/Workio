import { Link } from 'react-router-dom';
import { FaBuilding } from 'react-icons/fa';
import { IoLocationOutline } from 'react-icons/io5';

import { Tables } from '@/shared/types/database.types';
import companyLogo from '@/shared/assets/images/company-logo.webp';
import PrimaryButton from '../PrimaryButton/PrimaryButton';
import styles from './CompanyItem.module.scss';

interface ICompanyItemProps {
    companyData: Tables<'companies'>;
}

const CompanyItem = ({ companyData }: ICompanyItemProps) => {
    const { id, location, name, logo_url, industry } = companyData;

    return (
        <li className={styles['company-item']} role="listitem">
            <Link
                className={styles['company-item__link']}
                to={`/companies/${id}`}
            >
                <img
                    className={styles['company-item__logo']}
                    src={logo_url || companyLogo}
                    alt={name || 'Company logo'}
                />

                <div className={styles['company-item__info']}>
                    <h3 className={styles['company-item__name']}>{name}</h3>
                    <ul className={styles['company-item__other-info']}>
                        <li className={styles['company-item__other-info-item']}>
                            <span aria-hidden="true">
                                <FaBuilding />
                            </span>
                            <span className={styles['company-item__text']}>
                                {industry}
                            </span>
                        </li>
                        <li className={styles['company-item__other-info-item']}>
                            <span aria-hidden="true">
                                <IoLocationOutline />
                            </span>
                            <span className={styles['company-item__text']}>
                                {location}
                            </span>
                        </li>
                    </ul>
                </div>
            </Link>

            <Link
                className={styles['company-item__link-vacancies']}
                to={`/companies/${id}`}
                state={{ tab: 'vacancies' }}
            >
                <PrimaryButton
                    label="Show All Vacancies"
                    ariaLabel="Show All Vacancies"
                />
            </Link>
        </li>
    );
};

export default CompanyItem;
