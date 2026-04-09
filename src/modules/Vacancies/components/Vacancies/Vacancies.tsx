import MainHeader from '@/shared/UI/MainHeader/MainHeader';
import VacanciesList from '../VacanciesList/VacanciesList';
import { useAppDispatch } from '@/store/hooks';
import { IJobSearchForm } from '@/shared/components/JobSearchForm/JobSearchForm';
import { setFilters } from '../../store/vacanciesSlice';
import { VacanciesAndResumesSearch } from '@/shared/components/VacanciesAndResumesSearch/VacanciesAndResumesSearch';
import styles from './Vacancies.module.scss';

export const Vacancies = () => {
    const dispatch = useAppDispatch();
    const onSubmit = (filters: IJobSearchForm) => {
        dispatch(setFilters(filters));
    };

    return (
        <section className={styles.vacancies}>
            <MainHeader title="Vacancies" />

            <div className={styles.vacancies__main}>
                <VacanciesAndResumesSearch onSubmit={onSubmit} />

                <div className={styles.vacancies__results}>
                    <VacanciesList />
                </div>
            </div>
        </section>
    );
};
