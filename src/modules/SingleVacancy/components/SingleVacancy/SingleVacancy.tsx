import { useParams } from 'react-router-dom';

import { useGetVacancyQuery } from '../../api/singleVacancyApi';
import SingleVacancyHeader from '../SingleVacancyHeader/SingleVacancyHeader';
import ErrorComponent from '@/shared/UI/ErrorComponent/ErrorComponent';
import SingleVacancyOverview from '../SingleVacancyOverview/SingleVacancyOverview';
import SingleVacancyDescription from '../SingleVacancyDescription/SingleVacancyDescription';
import Spinner from '@/shared/UI/Spinner/Spinner';
import CompanyInfo from '@/shared/components/CompanyInfo/CompanyInfo';
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
            <div className={styles.vacancy__main}>
                <SingleVacancyDescription vacancyData={vacancyData} />

                <aside
                    className={styles.vacancy__aside}
                    aria-label="Vacancy details"
                >
                    <SingleVacancyOverview vacancyData={vacancyData} />
                    <CompanyInfo companyData={vacancyData.companies} />
                </aside>
            </div>
        </section>
    );
};
