import Spinner from '@/shared/UI/Spinner/Spinner';
import { useGetTopCompaniesQuery } from '../../api/topCompaniesApi';
import CompanyItem from '@/shared/UI/CompanyItem/CompanyItem';
import { ShowAllLinkBtn } from '@/shared/UI/ShowAllLinkBtn/ShowAllLinkBtn';
import styles from './TopCompanies.module.scss';

export const TopCompanies = () => {
    const {
        data: topCompanies,
        isError,
        isLoading,
    } = useGetTopCompaniesQuery();

    return (
        <section className={styles['top-companies']}>
            <div className={styles['top-companies__titles']}>
                <h3 className={styles['top-companies__title']}>
                    Top Companies
                </h3>
                <p className={styles['top-companies__subtitle']}>
                    Explore leading employers on Workio
                </p>
            </div>

            {isLoading && <Spinner />}

            {isError && (
                <p role="alert">Failed to load сompanies. Please try again.</p>
            )}

            {!isLoading && !isError && topCompanies?.length === 0 && (
                <p>No сompanies found</p>
            )}

            {!isLoading && !isError && topCompanies && (
                <>
                    <ul className={styles['top-companies__list']}>
                        {topCompanies.map((data) => (
                            <CompanyItem key={data.id} companyData={data} />
                        ))}
                    </ul>

                    <ShowAllLinkBtn link="/сompanies" />
                </>
            )}
        </section>
    );
};
