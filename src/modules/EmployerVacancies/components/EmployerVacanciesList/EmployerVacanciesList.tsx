import { useEffect } from 'react';

import { useAppSelector } from '@/store/hooks';
import { selectCompanyData, selectUserDataIsLoading } from '@/modules/Auth';
import Spinner from '@/shared/UI/Spinner/Spinner';
import ErrorComponent from '@/shared/UI/ErrorComponent/ErrorComponent';
import EmployerVacanciesItem from '../EmployerVacanciesItem/EmployerVacanciesItem';
import { useGetEmployerVacanciesQuery } from '@/modules/Vacancies';
import styles from './EmployerVacanciesList.module.scss';

const EmployerVacanciesList = () => {
    const company = useAppSelector(selectCompanyData);
    const userDataIsLoading = useAppSelector(selectUserDataIsLoading);

    const {
        data: vacancies,
        isFetching,
        error,
        refetch,
    } = useGetEmployerVacanciesQuery(company?.id ?? '', { skip: !company });

    useEffect(() => {
        company && refetch();
    }, []);

    if (userDataIsLoading || !company || isFetching)
        return (
            <div role="status" aria-busy="true" aria-live="polite">
                <Spinner />
            </div>
        );

    if (error)
        return (
            <ErrorComponent errorMessage="Failed to fetch vacancies. Please try again later." />
        );

    if (!vacancies?.length)
        return (
            <div role="status" aria-live="polite">
                <p>No vacancies yet.</p>
            </div>
        );

    return (
        <ul className={styles.vacancies}>
            {vacancies.map((item) => (
                <EmployerVacanciesItem
                    vacancyData={item}
                    key={item.id}
                    refetch={refetch}
                />
            ))}
        </ul>
    );
};

export default EmployerVacanciesList;
