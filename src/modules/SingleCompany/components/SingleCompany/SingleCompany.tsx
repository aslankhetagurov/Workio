import { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import ErrorComponent from '@/shared/UI/ErrorComponent/ErrorComponent';
import Spinner from '@/shared/UI/Spinner/Spinner';
import CompanyInfo from '@/shared/components/CompanyInfo/CompanyInfo';
import SingleCompanyAbout from '../SingleCompanyAbout/SingleCompanyAbout';
import SingleCompanyVacancies from '../SingleCompanyVacancies/SingleCompanyVacancies';
import SingleCompanyReviews from '../SingleCompanyReviews/SingleCompanyReviews';
import { TCurrentTab } from '../../types/SingleCompany.types';
import SingleCompanyTabs from '../SingleCompanyTabs/SingleCompanyTabs';
import RatingDisplay from '@/shared/components/RatingDisplay/RatingDisplay';
import { formatReviews } from '../../lib/formatReviews';
import { useGetCompanyQuery } from '@/modules/Companies';
import styles from './SingleCompany.module.scss';

export const SingleCompany = () => {
    const { companyId } = useParams();
    const location = useLocation();
    const initialTab = location.state?.tab || 'about';

    const [currentTab, setCurrentTab] = useState<TCurrentTab>(initialTab);

    if (!companyId)
        return (
            <ErrorComponent errorMessage="Faild to fetch company! Please try again later." />
        );

    const {
        data: companyData,
        error,
        isFetching,
    } = useGetCompanyQuery(companyId);

    if (isFetching)
        return (
            <div role="status" aria-busy="true" aria-live="polite">
                <Spinner />
            </div>
        );

    if (error)
        return (
            <ErrorComponent errorMessage="Faild to fetch company. Please try again later." />
        );

    if (!companyData)
        return (
            <ErrorComponent errorMessage="Company not found or data is incomplete. Please try again later." />
        );

    const { description, name, average_rating } = companyData;
    const { company_reviews, vacancies, ...mainData } = companyData;

    return (
        <section className={styles.company}>
            <aside className={styles.company__aside}>
                <CompanyInfo companyData={mainData} isSingleCompany={true} />
            </aside>

            <main className={styles.company__main}>
                <span className={styles.company__label}>Organization</span>
                <h1 className={styles.company__title}>{name}</h1>

                <div className={styles.company__rating}>
                    <RatingDisplay rating={average_rating} />
                    <button
                        className={styles.company__reviews}
                        type="button"
                        onClick={() => setCurrentTab('reviews')}
                    >
                        {formatReviews(company_reviews?.length ?? 0)}
                    </button>
                </div>

                <SingleCompanyTabs
                    setCurrentTab={setCurrentTab}
                    currentTab={currentTab}
                    vacanciesCount={vacancies?.length ?? 0}
                />

                {currentTab === 'about' ? (
                    <SingleCompanyAbout companyAbout={description} />
                ) : currentTab === 'vacancies' && vacancies ? (
                    <SingleCompanyVacancies vacancies={vacancies} />
                ) : (
                    <SingleCompanyReviews reviews={company_reviews ?? []} />
                )}
            </main>
        </section>
    );
};
