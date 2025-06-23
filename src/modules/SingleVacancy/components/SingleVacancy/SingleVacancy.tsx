import { useParams } from 'react-router-dom';

import { useGetVacancyQuery } from '../../api/singleVacancyApi';
import SingleVacancyHeader from '../SingleVacancyHeader/SingleVacancyHeader';
import ErrorComponent from '@/shared/UI/ErrorComponent/ErrorComponent';
import SingleVacancyOverview from '../SingleVacancyOverview/SingleVacancyOverview';
import SingleVacancyCompany from '../SingleVacancyCompany/SingleVacancyCompany';
import SingleVacancyDescription from '../SingleVacancyDescription/SingleVacancyDescription';
import Spinner from '@/shared/UI/Spinner/Spinner';
import styles from './SingleVacancy.module.scss';

export const SingleVacancy = () => {
    const { vacancyId } = useParams();
    if (!vacancyId) return null;

    const {
        data: vacancyData,
        error,
        isFetching,
    } = useGetVacancyQuery(vacancyId);

    if (isFetching)
        return (
            <div role="status" aria-busy="true" aria-live="polite">
                <Spinner />;
            </div>
        );

    if (!vacancyData || !vacancyData.companies)
        return (
            <ErrorComponent errorMessage="Vacancy not found or data is incomplete." />
        );

    if (error) return <ErrorComponent errorMessage="Faild to fetch vacancy!" />;

    return (
        <section className={styles.vacancy} aria-labelledby="vacancy-heading">
            <SingleVacancyHeader data={vacancyData} />
            <main className={styles.vacancy__main} role="main">
                <SingleVacancyDescription vacancyData={vacancyData} />

                <aside
                    className={styles.vacancy__aside}
                    aria-label="Vacancy details"
                >
                    <SingleVacancyOverview vacancyData={vacancyData} />
                    <SingleVacancyCompany companyData={vacancyData.companies} />
                </aside>
            </main>
        </section>
    );
};
