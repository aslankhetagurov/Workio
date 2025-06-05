import { useEffect, useState } from 'react';

import { useGetVacanciesQuery } from '../../api/vacanciesApi';
import { selectVacanciesSearchFilters } from '../../store/vacanciesSlice';
import { useAppSelector } from '@/store/hooks';
import VacancyItem from '@/shared/UI/VacancyItem/VacancyItem';
import PrimaryButton from '@/shared/UI/PrimaryButton/PrimaryButton';
import { VacancyWithCompany } from '@/shared/types/database.types';
import Spinner from '@/shared/UI/Spinner/Spinner';
import styles from './VacanciesList.module.scss';

const VacanciesList = () => {
    const [offset, setOffset] = useState(0);
    const [accVacancies, setAccVacancies] = useState<VacancyWithCompany[]>([]);
    const vacanciesSearchFilters = useAppSelector(selectVacanciesSearchFilters);
    const LIMIT = 10;

    const { data: vacancies, isFetching } = useGetVacanciesQuery({
        filters: vacanciesSearchFilters,
        offset,
        limit: LIMIT,
    });

    const isEndReached = (accVacancies?.length ?? 0) < offset + LIMIT;

    useEffect(() => {
        setAccVacancies([]);
        setOffset(0);
    }, [vacanciesSearchFilters]);

    useEffect(() => {
        if (!vacancies) return;

        setAccVacancies((prev) => [...prev, ...vacancies]);
    }, [vacancies]);

    const handleSetOffset = () => {
        setOffset((offset) => offset + LIMIT);
    };

    if (!accVacancies.length && isFetching) {
        return <Spinner />;
    }

    if (!accVacancies.length) {
        return <p className={styles.vacancies__empty}>No vacancies found.</p>;
    }

    return (
        <div className={styles.vacancies}>
            <ul className={styles.vacancies__list}>
                {accVacancies.map((vacancy) => (
                    <VacancyItem key={vacancy.id} data={vacancy} />
                ))}
            </ul>

            <div className={styles['vacancies__btn-wrapper']}>
                <PrimaryButton
                    label="Show More"
                    style={{ width: '150px' }}
                    isLoading={isFetching}
                    disabled={isFetching || isEndReached}
                    onClick={handleSetOffset}
                />
            </div>
        </div>
    );
};

export default VacanciesList;
