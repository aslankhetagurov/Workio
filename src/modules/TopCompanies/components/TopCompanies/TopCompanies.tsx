import { Link } from 'react-router-dom';

import Spinner from '@/UI/Spinner/Spinner';
import { useGetTopCompaniesQuery } from '../../api/topCompaniesApi';
import CompanyItem from '@/UI/CompanyItem/CompanyItem';
import PrimaryButton from '@/UI/PrimaryButton/PrimaryButton';
import styles from './TopCompanies.module.scss';

export const TopCompanies = () => {
    const {
        data: topCompanies,
        isError,
        error,
        isLoading,
    } = useGetTopCompaniesQuery();

    if (isError) {
        console.error('Error loading top companies:', error);
        return null;
    }

    if (!topCompanies) return null;

    return (
        <section className={styles['top-companies']}>
            <div className={styles['top-companies__titles']}>
                <h3 className={styles['top-companies__title']}>
                    Top Companies
                </h3>
                <span className={styles['top-companies__subtitle']}>
                    Explore leading employers on Workio
                </span>
            </div>

            <ul className={styles['top-companies__list']}>
                {isLoading ? (
                    <Spinner />
                ) : (
                    topCompanies.map((data) => (
                        <CompanyItem key={data.id} companyData={data} />
                    ))
                )}
            </ul>

            <Link className={styles['top-companies__link-all']} to="/companies">
                <PrimaryButton label="Show All" />
            </Link>
        </section>
    );
};
